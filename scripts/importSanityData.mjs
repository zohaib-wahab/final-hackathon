import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import slugify from 'slugify';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_STOCK_UPDATE,
  apiVersion: '2021-08-31',
});

async function uploadImageToSanity(imageObject) {
    try {
      const imageUrl = imageObject?.asset?.url;
      if (!imageUrl) {
        console.error('No valid image URL found:', imageObject);
        return null;
      }
  
      console.log(`Uploading image: ${imageUrl}`);
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data);
      const asset = await client.assets.upload('image', buffer, {
        filename: imageUrl.split('/').pop(),
      });
      console.log(`Image uploaded successfully: ${asset._id}`);
      return asset._id;
    } catch (error) {
      console.error('Failed to upload image:', imageObject, error);
      return null;
    }
  }

// Function to import data
async function importData() {
  try {
    console.log('Fetching products from API...');
    const response = await axios.get('https://6788dce82c874e66b7d69a40.mockapi.io/sanity/products');
    const products = response.data;
    console.log(`Fetched ${products.length} products`);

    for (const product of products) {
      console.log(`Processing product: ${product.name}`);

      // Upload main image
      let imageRef = null;
      if (product.image) {
        imageRef = await uploadImageToSanity(product.image);
      }

      // Upload additional images
      const additionalImageRefs = [];
      if (product.additionalImages && product.additionalImages.length > 0) {
        for (const additionalImage of product.additionalImages) {
          const additionalImageRef = await uploadImageToSanity(additionalImage.url);
          if (additionalImageRef) {
            additionalImageRefs.push({
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: additionalImageRef,
              },
            });
          }
        }
      }

      const slug = slugify(product.name, { lower: true, strict: true });

      const sanityProduct = {
        _type: 'product',
        name: product.name,
        slug: {
          _type: 'slug',
          current: slug,
        },
        image: imageRef
          ? {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageRef,
              },
            }
          : undefined,
        additionalImages: additionalImageRefs.length > 0 ? additionalImageRefs : undefined,
        description: [
          {
            _type: 'block',
            children: [
              {
                _type: 'span',
                text: product.description || 'No description available.',
              },
            ],
          },
        ],
        price: product.price,
        discountPrice: product.discountPrice || undefined,
        inStock: product.inStock || true,
        stock: product.stock || 0,
        rating: product.rating || 0,
        reviews: product.reviews || 0,
      };

      console.log('Uploading product to Sanity:', sanityProduct.name);
      const result = await client.create(sanityProduct);
      console.log(`Product uploaded successfully: ${result._id}`);
    }

    console.log('Data import completed successfully!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();
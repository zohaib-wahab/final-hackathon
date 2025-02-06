"use client";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Loader from "../home-components/loader";
import { useState, useEffect } from "react";
import { Product } from "../../../sanity.types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export default function BestSeller() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "productss"]{
        _id,
        title,
        price,
        "image": productImage.asset->url,
        discountPrice,
        slug,
        tags,
        description,
        inStock,
        stock
      }`;
      const data: Product[] = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAFA] py-10 px-5 md:px-20">
      <h2 className="text-center font-bold text-[#252B42] text-2xl md:text-3xl">
        BESTSELLER PRODUCTS
      </h2>
      <div className="border-b border-[#ECECEC] mt-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug?.current}`}
            className="group bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <div className="relative w-full h-[300px]">
              <Image
                src={
                  product.image
                    ? urlFor(product.image).width(280).height(300).url()
                    : "/fallback-image.jpg"
                }
                alt={product.name || "Product Image"}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg group-hover:opacity-90 transition-opacity"
              />
            </div>
            <div className="p-5">
              <h3 className="text-[#252B42] font-semibold text-lg group-hover:text-[#23856D] transition-colors">
                {product.title}
              </h3>
              <p className="text-[#737373] text-sm mt-2">
                {product.tags ? (typeof product.tags === "string" ? product.tags : product.tags.join(", ")) : ""}
              </p>
              <div className="flex items-center mt-3">
                {product.discountPrice && (
                  <span className="text-[#BDBDBD] text-lg line-through">${product.price}</span>
                )}
                <span className="text-[#23856D] font-bold text-xl ml-3">
                  ${product.discountPrice || product.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { FiChevronRight, FiHeart} from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import {  useCart } from "@/components/cart-components/CartContext";
import Footer from "@/components/team-components/footer";
import Header from "@/components/productList-components/header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { client } from "@/sanity/lib/client";
import Loader from "@/components/home-components/loader";
import { urlFor } from "@/sanity/lib/image";
import { useParams } from "next/navigation";

interface Product {
  _id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  description: string;
  discountPrice?: number;
  reviews: number;
  inStock: boolean;
  stock: number;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, addToWishlist } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const query = `*[_type == "productss" && slug.current == $id][0]{
          _id, title, "image": productImage.asset->url, category, price,
          description, discountPrice, reviews, inStock, stock
        }`;
        const product = await client.fetch(query, { id });
        if (!product) throw new Error("Product not found");
        setProduct(product);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load product";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);
  

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <nav className="text-gray-500 text-sm flex items-center gap-2">
          Home <FiChevronRight /> <span className="text-gray-700">Shop</span>
        </nav>

        <div className="mt-6 flex flex-col sm:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full sm:w-1/2 rounded-lg overflow-hidden shadow-md">
            <img
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="w-full sm:w-1/2 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">{product.title}</h2>
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, index) =>
                index < product.reviews ? <FaStar key={index} className="text-yellow-400" /> : <FaRegStar key={index} />
              )}
              <span className="text-gray-600">{product.reviews} Reviews</span>
            </div>
            <p className="text-xl font-bold text-gray-900">
              {product.discountPrice && (
                <span className="line-through text-gray-400 mr-2">${product.price}</span>
              )}
              ${product.discountPrice || product.price}
            </p>
            <p className={`font-semibold ${product.stock > 0 ? "text-blue-600" : "text-red-600"}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </p>
            <p className="text-gray-700">{product.description}</p>
            
            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => addToCart({
                  id: product._id,
                  name: product.title,
                  description: product.description,
                  price: product.discountPrice || product.price,
                  quantity: 1,
                  imageUrl: urlFor(product.image).url(),
                  inStock: product.stock > 0,
                  stock: product.stock,
                })}
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-md"
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist({
                  id: product._id,
                  name: product.title,
                  description: product.description,
                  price: product.discountPrice || product.price,
                  quantity: 1,
                  imageUrl: urlFor(product.image).url(),
                  inStock: product.stock > 0,
                  stock: product.stock,
                })}
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md shadow-md"
              >
                <FiHeart />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}

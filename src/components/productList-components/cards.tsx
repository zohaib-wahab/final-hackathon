"use client";
import Link from "next/link";
import ProductCard, { Product } from "../home-components/product-card";
import { useState, useEffect } from "react";
import { client } from "@/sanity/lib/client";
import Loader from "../home-components/loader";

const Cards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "productList"]{
        _id,
        name,
        slug,
        image,
        description,
        price,
        discountPrice,
        colors,
        department,
        stock,
        rating,
        inStock,
      }`;

      const data: Product[] = await client.fetch(query);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className="text-center text-lg text-[#252B42]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center mt-5 mb-7 wrapper">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6 w-full">
        {products.map((product) => (
          <div
            key={product._id}
            className="transition duration-300 hover:-translate-y-1"
          >
            <Link href={`/productList/${product.slug?.current}`} passHref>
              <div>
                <ProductCard product={product} />
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-wrap justify-center items-center space-x-4 mt-16 border border-[#BDBDBD] rounded-md">
        <button className="px-4 py-2 bg-[#F3F3F3] text-[#BDBDBD] rounded-md hover:bg-gray-300 text-sm sm:px-8 sm:py-6 transition duration-200">
          First
        </button>
        <div className="flex justify-center space-x-2 mt-4 sm:mt-0">
          <button className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6 -mt-3 md:-mt-0 transition duration-200">
            1
          </button>
          <button className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6 -mt-3 md:-mt-0 transition duration-200">
            2
          </button>
          <button className="px-4 py-2 font-bold rounded-md text-[#23A6F0] hover:bg-[#23A6F0] hover:text-white text-sm sm:px-8 sm:py-6 -mt-3 md:-mt-0 transition duration-200">
            3
          </button>
        </div>
        <button className="px-4 py-2 text-[#23A6F0] rounded-md hover:bg-[#1D8CC8] hover:text-white text-sm sm:px-8 sm:py-6 transition duration-200">
          Next
        </button>
      </div>
    </div>
  );
};

export default Cards;

"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; 
import Card from "@/components/Card";
import { URL } from "@/utils/constant";

type Product = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    const response = await fetch(`${URL}/api/products`, { cache: "no-store" });
    return response.json();
  };

  useEffect(() => {
    loadProducts().then(setProducts);
  }, []);

  // return (
  //   <div className="min-h-screen bg-gray-100 p-4">
  //     <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
  //       {products.map((product) => (
  //         <Link key={product.slug} href={`/products/${product.slug}`}>
  //           <Card
  //             name={product.name}
  //             price={product.price}
  //             excerpt={product.excerpt}
  //             thumbnail={product.thumbnail}
  //             tags={product.tags}
  //           />
  //         </Link>
  //       ))}
  //     </div>
  //   </div>
  // );
  return (
    <section className="py-20 bg-gray-100"> \
      <div className="container mx-auto px-6 text-center"> 
        <h2 className="text-2xl font-bold text-black mb-10">
          Product List
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10"> 
          {products.map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`}>
              <Card
                name={product.name}
                price={product.price}
                excerpt={product.excerpt}
                thumbnail={product.thumbnail}
                tags={product.tags}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
  
}

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProductDetail from "@/components/ProductDetail";

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

export default function Product({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.slug}`);
        
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        router.push("/404");
      }
    };

    fetchProduct();
  }, [params.slug, router]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="flex h-screen bg-white text-white justify-center items-center">
      <ProductDetail
        productId={product._id}
        name={product.name}
        description={product.description}
        excerpt={product.excerpt}
        price={product.price}
        thumbnail={product.thumbnail}
        images={product.images}
        tags={product.tags}
      />
      {/* <h1>masuk gaaaaaa????</h1> */}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

const slideProducts = [
  {
    id: 1,
    image: "/assets/pict1.jpg",
    title: "Bluetooth Speaker",
  },
  {
    id: 2,
    image: "/assets/pict2.jpg",
    title: "Tripod Stand",
  },
  {
    id: 3,
    image: "/assets/pict3.jpg",
    title: "Earbuds",
  },
  {
    id: 4,
    image: "/assets/pict4.jpg",
    title: "Headphones",
  },
];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`${URL}/api/products/tags?tags=gamis`);
      const productsData = await response.json();
      setProducts(productsData);
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className="flex h-screen bg-white text-white justify-center items-center">
        <section className="relative h-96 bg-gradient-to-r from-yellow-400 to-red-600 text-white">
          <div className="container mx-auto flex justify-between items-center px-6 py-12">
            <div>
              <h2 className="text-5xl font-bold">DISCOUNT UP TO 90%</h2>
              <p className="text-2xl mt-4">Don&apos;t miss out! Only today!</p>
              <Link
                href="/shop"
                className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
              >
                BELI SEKARANG
              </Link>
            </div>
            <div className="flex space-x-6">
              {slideProducts.map((product, index) => (
                <Image
                  key={product.id}
                  src={product.image}
                  alt={product.title}
                  width={128}
                  height={128}
                  className={`w-32 h-32 object-cover rounded-full transform transition duration-500 ${
                    index === currentIndex ? "scale-110" : "scale-90"
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Automatic Sliding Section */}
      <section className="h-72 overflow-hidden relative">
        <div
          className="absolute inset-0 flex transition-transform ease-linear duration-1000"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slideProducts.map((product) => (
            <div
              key={product.id}
              className="min-w-full h-full flex justify-center items-center"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={384}
                height={384}
                className="w-96 h-96 object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-black mb-10">
            Muslimah Popular Products this week
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {products.map((product) => (
              <Card
                key={product._id}
                name={product.name}
                price={product.price}
                excerpt={product.excerpt}
                thumbnail={product.thumbnail}
                tags={product.tags}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

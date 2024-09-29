"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from 'next/image'; // Mengimpor Image dari next/image
import ImageCarousel from "./ImageCarousel";
import { FaHeart } from "react-icons/fa";

type ProductDetailCardProps = {
  name: string;
  description: string;
  excerpt: string;
  price: number;
  thumbnail: string;
  images: string[];
  tags: string[];
  productId: string;
};

export default function ProductDetail({
  name,
  description,
  excerpt,
  price,
  images,
  tags,
  productId,
}: ProductDetailCardProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const localToken =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    setToken(localToken);
  }, []);

  const checkWishlist = useCallback(async () => {
    if (token) {
      const response = await fetch(`/api/wishlist?productId=${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsInWishlist(data.isInWishlist);
      }
    }
  }, [token, productId]);

  useEffect(() => {
    if (token) {
      checkWishlist();
    }
  }, [token, productId, checkWishlist]);

  const handleWishlistToggle = async () => {
    if (token) {
      const method = isInWishlist ? "DELETE" : "POST";
      const response = await fetch(`/api/wishlist`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsInWishlist(data.isInWishlist); 
      }
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-300">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white">
        {/* Bagian Kiri */}
        <div className="col-span-3">
          <div className="relative">
            <ImageCarousel images={images} />
            <FaHeart
              className={`absolute top-4 right-4 text-2xl cursor-pointer ${
                isInWishlist ? "text-red-500" : "text-gray-400"
              }`}
              onClick={handleWishlistToggle}
            />
          </div>
          <div className="p-4">
            <h1 className="text-3xl text-gray-600 font-bold">{name}</h1>
            <p className="text-orange-500 text-xl mt-2">
              Rp {price.toLocaleString()}
            </p>
            <p className="mt-4 text-gray-600">{description}</p>
            <p className="italic mt-2 text-gray-600">{excerpt}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-600">Tags:</h3>
              <div>
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge badge-primary mr-2 text-yellow-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Kanan: Produk Sponsor */}
        <div className="col-span-1">
          <h1 className="text-lg font-bold text-black-500 flex justify-center items-center">
            Produk Sponsor
          </h1>

          <div className="space-y-4">
            {/* Card pertama */}
            <div className="bg-white shadow-lg p-4">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5BTw1GkGYHMHQc48gai5nBA5gu4YIrX49rw&se"
                alt="Product 1"
                width={500}
                height={200}
                className="w-full h-32 object-cover"
              />
              <h2 className="text-lg mt-2 text-black">Jaket Korea Hijaket</h2>
              <p className="text-orange-500">Rp 46.700</p>
            </div>

            {/* Card kedua */}
            <div className="bg-white shadow-lg p-4">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8vOMG9qNM5Ej43lPvu5pZMxECgovMgDefhA&s"
                alt="Product 2"
                width={500}
                height={200}
                className="w-full h-32 object-cover"
              />
              <h2 className="text-lg mt-2 text-black">Hijaket azzenza</h2>
              <p className="text-orange-500">Rp 24.600</p>
            </div>

            {/* Card ketiga */}
            <div className="bg-white shadow-lg p-4">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQscNdNzqwehwkguXeysZpb4yfHuJgQLi9CCw&s"
                alt="Product 3"
                width={500}
                height={200}
                className="w-full h-32 object-cover"
              />
              <h2 className="text-lg mt-2 text-black">Jaket Zara</h2>
              <p className="text-orange-500">Rp 170.000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

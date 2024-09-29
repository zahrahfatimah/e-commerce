"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

type ProductModel = {
  _id: string;
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  excerpt: string;
  tags: string[];
  images: string[];
};

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `/api/search?query=${encodeURIComponent(query)}`
          );
          const data = await response.json();
          setProducts(data.result);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [query]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      {products.length > 0 ? (
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <ProductDetail
              key={product._id}
              productId={product._id}
              name={product.name}
              excerpt={product.excerpt}
              tags={product.tags}
              images={product.images}
              description={product.description || ""}
              price={product.price}
              thumbnail={product.thumbnail}
            />
          ))}
        </div>
      ) : (
        <p>No products found for &quot;{query}&quot;</p>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search results...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

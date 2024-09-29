// src/components/Card.tsx
import Image from "next/image";

type CardProps = {
  name: string;
  price: number;
  thumbnail: string;
  tags: string[];
  excerpt: string;
};

export default function Card({
  name,
  price,
  thumbnail,
  tags,
}: CardProps) {
  console.log("Product tags:", tags); 
  const isNew = tags.includes("gamis");

  return (
    <div className="card w-60 min-h-[20rem] bg-white backdrop-filter backdrop-blur-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out p-4">
      <figure className="bg-white w-full h-[10rem] relative">
        <Image
          className="w-full h-full object-cover"
          src={thumbnail}
          alt={name}
          layout="fill"
          objectFit="cover"
        />
      </figure>
  
      <div className="card-body h-auto overflow-hidden">
        <h2 className="card-title text-black text-sm">
          {isNew && <div className="bg-[#FFC5C5] rounded text-white mt-2 mb-2">NEW</div>}
          {name}
        </h2>
  
        <p className="text-lg font-bold text-orange-500">
          Rp {price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

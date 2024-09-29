import React, { useState } from "react";
import Image from "next/image"; // Import Image dari next/image

type ImageCarouselProps = {
  images: string[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative">
      <Image
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
        layout="fill"
        objectFit="cover"
        className="w-full h-96 object-cover"
      />
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2"
      >
        &gt;
      </button>
    </div>
  );
}

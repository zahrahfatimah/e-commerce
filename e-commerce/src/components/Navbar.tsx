"use client";
import { useState } from "react";
import debounce from "lodash.debounce";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const debouncedSearch = debounce((query: string) => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query.trim())}`);
    }
  }, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    debouncedSearch(newQuery);
  };

  return (
    <div className="navbar bg-white shadow-md px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="text-[#00124E] hover:text-[#F47B20]">
          LAZADA
        </Link>
      </div>

      <div className="flex-1 mx-4">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Cari di Lazada"
            value={searchQuery}
            onChange={handleChange}
            className="input input-bordered w-full bg-[#F4F5F7] text-gray-600 pl-4 pr-10 h-10 rounded-full focus:outline-none"
          />
          <button
            onClick={() => debouncedSearch(searchQuery)}
            className="absolute right-3 bg-[#F47B20] text-white p-2 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/products" className="text-[#00124E] hover:text-[#F47B20]">
          More products
        </Link>

        <LogoutButton />
        <button className="text-[#00124E] hover:text-[#F47B20]">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-[#0A1D51] h-6 w-6"
          />
        </button>
      </div>
    </div>
  );
}

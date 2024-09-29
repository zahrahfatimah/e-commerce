import { NextRequest, NextResponse } from "next/server";
import { createWL, getWL, wishlistUniqueVal } from "@/db/models/wishlist";
import { readPayload } from "@/utils/jwt";
import { ObjectId } from "mongodb";

interface ParsedCookies {
  [key: string]: string;
}

function parseCookies(cookieString: string): ParsedCookies {
  return cookieString
    .split(";")
    .reduce((acc: ParsedCookies, cookie: string) => {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      acc[name] = value;
      return acc;
    }, {});
}

async function getUserId(token: string): Promise<string> {
  const payload = await readPayload(token);
  return payload.id;
}

export async function GET(request: NextRequest) {
  try {
    const cookies = request.headers.get("cookie");
    const parsedCookies = parseCookies(cookies || "");
    const token = parsedCookies.token;

    if (!token) {
      return NextResponse.json({ error: "Token not provided" }, { status: 401 });
    }

    const userId = await getUserId(token);
    const wishlists = await getWL(userId);
    const products = wishlists.map((wishlist) => wishlist.product);

    return NextResponse.json(products);
  } catch (error) {
    console.error("Failed to fetch wishlists:", error); // Menangkap error dengan console
    return NextResponse.json({ error: "Failed to fetch wishlists" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookies = request.headers.get("cookie");
    const parsedCookies = parseCookies(cookies || "");
    const token = parsedCookies.token;

    if (!token) {
      return NextResponse.json({ error: "Token not provided" }, { status: 401 });
    }

    const userId = await getUserId(token);
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const wishlistInput = {
      userId: new ObjectId(userId),
      productId: new ObjectId(productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const existingWishlist = await wishlistUniqueVal(userId, productId);
    if (existingWishlist) {
      return NextResponse.json({ error: "Wishlist entry already exists" }, { status: 400 });
    }

    await createWL(wishlistInput);
    return NextResponse.json({ statusCode: 201 });
  } catch (error) {
    console.error("Failed to create wishlist:", error); // Menangkap error dengan console
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

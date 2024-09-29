import { getProductsByTags } from "@/db/models/product";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const tags = searchParams.get("tags")?.split(",") || [];

  const products = await getProductsByTags(tags);

  console.log("Tags:", tags);
  return NextResponse.json(products);
};

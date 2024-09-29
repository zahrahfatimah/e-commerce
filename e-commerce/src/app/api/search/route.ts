import { searchProduct } from "@/db/models/product";
import { NextRequest, NextResponse } from "next/server";
import { ProductModel } from "@/db/models/product";

interface SearchResponse {
  totalPage: number;
  result: ProductModel[];
}

export const GET = async (
  request: NextRequest
): Promise<NextResponse<SearchResponse>> => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';
  console.log(url.searchParams);

  const result = await searchProduct(query);

  const response: SearchResponse = {
    totalPage: result.totalPage,
    result: result.products,
  };

  return NextResponse.json(response);
};

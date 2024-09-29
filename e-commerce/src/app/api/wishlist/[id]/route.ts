import {deleteWL } from "@/db/models/wishlist";
import { readPayload } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

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

async function getUserId(token: string) {
  const payload = await readPayload(token);
  return payload.id;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const cookies = request.headers.get("cookie");
  const parsedCookies = parseCookies(cookies || "");
  const token = parsedCookies.token;

  const productId = params.id
  const userId = await getUserId(token)
  await deleteWL(productId, userId)

  return NextResponse.json({
    statusCode: 200
  })
}

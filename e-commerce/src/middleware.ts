import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayload } from "@/utils/jwt";

export async function middleware() {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  if (token) {
    try {
      const payload = await readPayload(token.value);
      console.log("Payload di middleware:", payload);
    } catch (error) {
      console.error("Error saat membaca payload:", error);
      return NextResponse.error();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};

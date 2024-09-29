import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { readPayload } from "@/utils/jwt";

export const middleware = async (request: NextRequest) => {
  const url = new URL(request.url);

  if (
    !url.pathname.includes("/api") &&
    !url.pathname.includes("_next/static") &&
    // !url.pathname.includes("_next/image") &&
    !url.pathname.includes("favicon.ico")
  ) {
    console.log(`${request.method} ${request.url}`);
  }

  if (url.pathname.includes("/api")) {
    console.log("API", request.method, request.url);

    if (url.pathname.includes("/api/search")) {
      console.log("API /api/search accessed");
      return NextResponse.next();
    }

    const cookieStore = cookies();
    const tokenCookie = cookieStore.get("token");
    
    const token = tokenCookie?.value;
    console.log("Extracted Token:", token);

    if (!token) {
      console.log("No token found, unauthorized access");
      return NextResponse.json({ statusCode: 401, error: "Unauthorized" });
    }

    try {
      const tokenData = await readPayload(token);
      console.log("Token payload:", tokenData);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", tokenData.id);
      requestHeaders.set("x-user-email", tokenData.email);
      requestHeaders.set("x-custom-value", "Ini untuk mencoba data tambahan");

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Token verification error:", error);
      return NextResponse.json({ statusCode: 401, error: "Unauthorized" });
    }
  }

  return NextResponse.next();
};

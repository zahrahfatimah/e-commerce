import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function POST() {
  const tokenCookie = cookies().get("token");
  
  if (tokenCookie) {
    cookies().delete("token");
  }
  
  redirect("/login");
}


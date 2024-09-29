// import type { NextApiRequest, NextApiResponse } from "next";
// import { readPayload } from "@/utils/jwt";
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     const token = req.cookies.token; 

//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//       const payload = await readPayload(token); 
//       return res.status(200).json({ message: "Authenticated", user: payload }); 
//     } catch (error) {
//       console.log(error)
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

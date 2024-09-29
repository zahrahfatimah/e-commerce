import * as jose from "jose";

type Payload = {
  id: string;
  email: string;
  username: string;
};

const SECRET_KEY = process.env.SECRET_KEY 

export const createToken = async (payload: Payload): Promise<string> => {
  try {
    const secretKey = new TextEncoder().encode(SECRET_KEY); // Konversi kunci rahasia
    return await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("2h")
      .sign(secretKey);
  } catch (error) {
    console.error("Error creating token:", error);
    throw new Error("Token creation failed");
  }
};

export const readPayload = async (token: string): Promise<Payload> => {
  try {
    const secretKey = new TextEncoder().encode(SECRET_KEY); // Konversi kunci rahasia
    const { payload } = await jose.jwtVerify(token, secretKey);
    return payload as Payload;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Token verification failed");
  }
};

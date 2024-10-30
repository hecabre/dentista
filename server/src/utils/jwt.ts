import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "dotenv";

config();

export async function createAccessToken(payload: JwtPayload): Promise<string> {
  return new Promise((resolve, reject) => {
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      return reject(
        new Error("SECRET_KEY is not defined in environment variables")
      );
    }

    jwt.sign(payload, secret, { expiresIn: "1h" }, (err, token) => {
      if (err) return reject(err);
      if (!token) return reject(new Error("Token generation failed"));
      resolve(token);
    });
  });
}

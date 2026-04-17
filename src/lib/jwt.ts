/**
 * Utilidades JWT compatibles con Cloudflare Workers.
 * Usa el paquete `jose` con Web Crypto API en lugar de `jsonwebtoken`
 * que depende de módulos nativos de Node.js.
 */

import { SignJWT, jwtVerify } from "jose";

function getSecret(): Uint8Array {
  const secret =
    typeof process !== "undefined" && process.env?.JWT_SECRET
      ? process.env.JWT_SECRET
      : "default_secret";
  return new TextEncoder().encode(secret);
}

export interface JwtPayload {
  id: string;
  username?: string;
  name?: string;
  role: "user" | "admin";
  [key: string]: unknown;
}

export async function signJwt(payload: JwtPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyJwt(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, getSecret());
  return payload as unknown as JwtPayload;
}

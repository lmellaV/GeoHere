/**
 * Utilidades JWT compatibles con Cloudflare Workers.
 * Usa el paquete `jose` con Web Crypto API en lugar de `jsonwebtoken`
 * que depende de módulos nativos de Node.js.
 */

import { SignJWT, jwtVerify } from "jose";
import { getCloudflareContext } from "@opennextjs/cloudflare";

function getSecret(): Uint8Array {
  try {
    const { env } = getCloudflareContext();
    const secret = (env as any).JWT_SECRET || process.env?.JWT_SECRET;
    if (!secret) {
      console.warn("JWT_SECRET not found in env or process.env, using default");
      return new TextEncoder().encode("default_secret");
    }
    return new TextEncoder().encode(secret);
  } catch (error) {
    // Fallback para desarrollo local
    const secret = process.env?.JWT_SECRET || "default_secret";
    return new TextEncoder().encode(secret);
  }
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

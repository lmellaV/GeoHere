/**
 * Hashing de contraseñas compatible con Cloudflare Workers.
 * Usa la Web Crypto API (PBKDF2 con SHA-256) que corre nativamente
 * en cualquier entorno Web/Workers sin módulos nativos de Node.
 *
 * Formato del hash almacenado: pbkdf2:<saltHex>:<hashHex>
 * (distinto de Argon2 — no es retrocompatible con hashes anteriores)
 */

const ALGO = "PBKDF2";
const HASH_FN = "SHA-256";
const ITERATIONS = 100_000;
const KEY_LENGTH = 32; // bytes → 256 bits

function uint8ToHex(buf: Uint8Array): string {
  return Array.from(buf)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToUint8(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    ALGO,
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    {
      name: ALGO,
      salt: salt.buffer as ArrayBuffer,
      iterations: ITERATIONS,
      hash: HASH_FN,
    },
    keyMaterial,
    KEY_LENGTH * 8,
  );
  return `pbkdf2:${uint8ToHex(salt)}:${uint8ToHex(new Uint8Array(derived))}`;
}

export async function verifyPassword(
  stored: string,
  input: string,
): Promise<boolean> {
  if (typeof stored !== "string") return false;

  if (stored.startsWith("$argon2")) {
    try {
      const mod = await import("argon2");
      const argon2 = (mod as any).default ?? mod;
      return await argon2.verify(stored, input);
    } catch {
      throw new Error("argon2_password_hash_not_supported_in_this_runtime");
    }
  }

  const [, saltHex, hashHex] = stored.split(":");
  if (!saltHex || !hashHex) return false;

  const salt = hexToUint8(saltHex);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(input),
    ALGO,
    false,
    ["deriveBits"],
  );
  const derived = await crypto.subtle.deriveBits(
    {
      name: ALGO,
      salt: salt.buffer as ArrayBuffer,
      iterations: ITERATIONS,
      hash: HASH_FN,
    },
    keyMaterial,
    KEY_LENGTH * 8,
  );
  const attempt = uint8ToHex(new Uint8Array(derived));
  // Comparación en tiempo constante
  return timingSafeEqual(attempt, hashHex);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

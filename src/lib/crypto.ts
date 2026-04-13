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
const ITERATIONS = 250_000;
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
  // Soporte legacy para hashes Argon2 almacenados ($argon2...)
  // En Workers, argon2 nativo no está disponible. Nunca debería llegar acá
  // en producción si la migración fue correcta, pero lo señalamos explícitamente.
  if (stored.startsWith("$argon2")) {
    throw new Error(
      "Este hash fue generado con Argon2 y no puede verificarse en Cloudflare Workers. " +
        "Ejecuta el script de migración de base de datos para regenerar las contraseñas.",
    );
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

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function stableStringify(value: unknown): string {
  if (value === null || typeof value !== "object") {
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }

  const entries = Object.entries(value as Record<string, unknown>).sort(
    ([a], [b]) => a.localeCompare(b),
  );

  return `{${entries
    .map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`)
    .join(",")}}`;
}

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function signPayload(
  payload: Record<string, unknown>,
): Promise<string> {
  const secret =
    process.env.DATA_SIGNATURE_SECRET ||
    process.env.JWT_SECRET ||
    "default_integrity_secret";

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const canonicalPayload = stableStringify(payload);
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(canonicalPayload),
  );

  return toBase64Url(new Uint8Array(signature));
}

export async function buildIntegrityProof(
  payload: Record<string, unknown>,
  prevChainHash: string | null,
): Promise<{
  payloadHash: string;
  signature: string;
  prevChainHash: string | null;
  chainHash: string;
}> {
  const canonicalPayload = stableStringify(payload);
  const payloadHash = await sha256Hex(canonicalPayload);
  const signature = await signPayload(payload);
  const chainBase = `${prevChainHash || ""}:${payloadHash}:${signature}`;
  const chainHash = await sha256Hex(chainBase);

  return {
    payloadHash,
    signature,
    prevChainHash,
    chainHash,
  };
}

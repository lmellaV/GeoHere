import { NextRequest } from "next/server";

export function getRequestMetadata(req: NextRequest): {
  sourceIp: string;
  userAgent: string;
} {
  const sourceIp =
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() ||
    "unknown";

  const userAgent = req.headers.get("user-agent") || "unknown";

  return { sourceIp, userAgent };
}

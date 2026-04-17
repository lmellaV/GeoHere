import { NextResponse } from "next/server";
import { db } from "@/db";

export async function GET() {
  try {
    // Simple test query
    const result = await db.run("SELECT 1 as test");
    return NextResponse.json({
      success: true,
      message: "Database connection works",
      result: result
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Database connection failed",
        error: error?.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}
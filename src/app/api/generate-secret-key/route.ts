import { generateSecureKey } from "@/utils/aes-utils";
import { NextResponse } from "next/server";

export async function GET() {
  const { md5Hash } = generateSecureKey();
  return NextResponse.json({ secureKey: md5Hash });
}

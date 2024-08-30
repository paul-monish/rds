import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  const authorizationHeader = request.headers.get("Authorization");
  const secretKey = process.env.API_SECRET_KEY;

  if (!authorizationHeader || authorizationHeader !== `${secretKey}`) {
    return new NextResponse("Access not allowed", { status: 403 });
  }
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "api",
    "get-html",
    "response.html"
  );
  const htmlContent = fs.readFileSync(filePath, "utf8");

  return new NextResponse(htmlContent, {
    headers: { "Content-Type": "text/html" },
  });
}

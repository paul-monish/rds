import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    return NextResponse.json({
      message: "Transaction is Successful",
      receivedData: data,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { message: "An error occurred while processing your request." },
      { status: 500 }
    );
  }
}

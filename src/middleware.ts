import moment from "moment";
import { NextRequest, NextResponse } from "next/server";
import { decryptAES } from "./utils/aes-utils";
import { convertToObject } from "./utils/helper";

export async function middleware(request: NextRequest) {
  if (request.method === "POST") {
    const data = await request.formData();
    const encdata = data.get("encdata")?.toString();
    let paymentData: any;
    if (encdata) {
      const data = decryptAES(encdata);
      paymentData = convertToObject(data);
    } else {
      alert();
    }

    const response = await fetch(new URL("/api/get-html", request.url), {
      method: "POST",
      headers: {
        Authorization: `${process.env.API_SECRET_KEY}`,
      },
    });
    if (response.ok) {
      let htmlContent = await response.text();
      htmlContent = htmlContent
        .replace("[reservationId]", paymentData?.reservationId || "")
        .replace(
          "[txnDate]",
          moment(paymentData?.txnDate, "YYYYMMDD").format("YYYY-MM-DD")
        )
        .replace("[txnAmount]", paymentData?.txnAmount || "");

      return new NextResponse(htmlContent, {
        headers: { "Content-Type": "text/html" },
      });
    } else {
      return NextResponse.redirect(new URL("/error", request.url));
    }
  } else if (request.method === "GET") {
    return NextResponse.redirect(new URL("/error", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: "/",
};

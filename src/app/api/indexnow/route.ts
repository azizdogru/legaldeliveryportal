import { NextResponse } from "next/server";
import { ALL_DOCUMENTS } from "@/config/documents";
import { US_STATES } from "@/data/usStates";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const host = "legaldeliveryportal.com";
    const key = process.env.INDEXNOW_KEY || "8f3e2a9b6c1d4e7f8a0b2c4d6e8f1a3b";
    const keyLocation = `https://${host}/${key}.txt`;

    let urlList: string[] = body.urls || [];

    if (urlList.length === 0) {
      // Build master URL list of core and pSEO routes
      urlList = [
        `https://${host}/`,
        `https://${host}/forms`,
        ...ALL_DOCUMENTS.map((doc) => `https://${host}/forms/${doc.slug}`),
        ...ALL_DOCUMENTS.flatMap((doc) =>
          US_STATES.slice(0, 10).map((st) => `https://${host}/forms/${doc.slug}/${st.slug}`)
        ),
      ];
    }

    const payload = {
      host,
      key,
      keyLocation,
      urlList,
    };

    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      status: "submitted",
      submittedUrlsCount: urlList.length,
      indexNowStatusCode: response.status,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "IndexNow submission failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    service: "IndexNow API Handler",
    host: "legaldeliveryportal.com",
    keyLocation: "https://legaldeliveryportal.com/8f3e2a9b6c1d4e7f8a0b2c4d6e8f1a3b.txt",
    instructions: "Send a POST request with an optional { urls: string[] } payload to trigger Bing IndexNow.",
  });
}

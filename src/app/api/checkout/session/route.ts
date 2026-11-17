import { NextRequest, NextResponse } from "next/server";
import { saveCheckoutSession, getCheckoutSession, CheckoutSessionData } from "@/lib/storage/s3";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, docSlug, stateCode, customerEmail, customerName, formData } = body;

    if (!sessionId || !docSlug || !stateCode) {
      return NextResponse.json(
        { error: "sessionId, docSlug, and stateCode are required" },
        { status: 400 }
      );
    }

    const sessionData: CheckoutSessionData = {
      sessionId,
      docSlug,
      stateCode,
      customerEmail: customerEmail || "",
      customerName: customerName || "",
      formData: formData || {},
      createdAt: new Date().toISOString(),
    };

    const result = await saveCheckoutSession(sessionData);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to persist checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, sessionId });
  } catch (err: any) {
    console.error("Checkout session save error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");

    if (!sessionId) {
      return NextResponse.json({ error: "sessionId required" }, { status: 400 });
    }

    const session = await getCheckoutSession(sessionId);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, session });
  } catch (err: any) {
    console.error("Checkout session fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

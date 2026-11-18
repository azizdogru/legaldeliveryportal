import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

interface UploadPdfOptions {
  pdfBuffer: Buffer | Uint8Array;
  fileName: string;
  docSlug: string;
  stateCode: string;
  customerEmail?: string;
  customerName?: string;
}

export interface CheckoutSessionData {
  sessionId: string;
  docSlug: string;
  stateCode: string;
  customerEmail?: string;
  customerName?: string;
  formData: Record<string, any>;
  createdAt: string;
}

export async function uploadPdfToVault({
  pdfBuffer,
  fileName,
  docSlug,
  stateCode,
  customerEmail,
  customerName,
}: UploadPdfOptions): Promise<{ success: boolean; s3Key?: string; s3Url?: string; error?: string }> {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || "legaldeliveryportal-vault-892401";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || "us-east-1";

  if (!accessKeyId || !secretAccessKey) {
    console.error("AWS S3 credentials missing from environment variables");
    return { success: false, error: "AWS credentials not configured" };
  }

  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const timestamp = Date.now();
  const dateFolder = new Date().toISOString().split("T")[0];
  const safeName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  const s3Key = `official-documents/${dateFolder}/${timestamp}_${docSlug}_${stateCode}_${safeName}`;

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: Buffer.from(pdfBuffer),
      ContentType: "application/pdf",
      Metadata: {
        docslug: docSlug,
        statecode: stateCode,
        customeremail: customerEmail || "unspecified",
        customername: customerName ? customerName.replace(/[^a-zA-Z0-9 ]/g, "") : "anonymous",
        uploadedat: new Date().toISOString(),
      },
    });

    await s3Client.send(command);
    const s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${s3Key}`;

    return {
      success: true,
      s3Key,
      s3Url,
    };
  } catch (err: any) {
    console.error("S3 upload error:", err);
    return {
      success: false,
      error: err.message || "Failed to upload document to AWS S3 vault",
    };
  }
}

/**
 * Saves pending checkout session form data to S3 so webhook can access real user data
 */
export async function saveCheckoutSession(session: CheckoutSessionData): Promise<{ success: boolean; error?: string }> {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || "legaldeliveryportal-vault-892401";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || "us-east-1";

  if (!accessKeyId || !secretAccessKey) {
    return { success: false, error: "AWS credentials not configured" };
  }

  const s3Client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  const s3Key = `checkout-sessions/${session.sessionId}.json`;

  try {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
      Body: JSON.stringify(session),
      ContentType: "application/json",
      Metadata: {
        docslug: session.docSlug,
        statecode: session.stateCode,
        customeremail: (session.customerEmail || "unspecified").replace(/[^a-zA-Z0-9@._-]/g, ""),
      },
    });

    await s3Client.send(command);
    return { success: true };
  } catch (err: any) {
    console.error("Save checkout session error:", err);
    return { success: false, error: err.message || "Failed to save session to S3" };
  }
}

/**
 * Retrieves pending checkout session form data from S3 by sessionId
 */
export async function getCheckoutSession(sessionId: string): Promise<CheckoutSessionData | null> {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || "legaldeliveryportal-vault-892401";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || "us-east-1";

  if (!accessKeyId || !secretAccessKey || !sessionId) {
    return null;
  }

  const s3Client = new S3Client({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });

  const s3Key = `checkout-sessions/${sessionId}.json`;

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: s3Key,
    });

    const response = await s3Client.send(command);
    if (!response.Body) return null;

    const bodyStr = await response.Body.transformToString();
    return JSON.parse(bodyStr) as CheckoutSessionData;
  } catch (err: any) {
    console.error("Get checkout session error:", err?.message || err);
    return null;
  }
}

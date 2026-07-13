/**
 * 腾讯云 COS 对象存储客户端
 */
import COS from "cos-nodejs-sdk-v5";

const cos = new COS({
  SecretId: process.env.COS_SECRET_ID!,
  SecretKey: process.env.COS_SECRET_KEY!,
});

const BUCKET = process.env.COS_BUCKET!;
const REGION = process.env.COS_REGION || "ap-guangzhou";
const BASE_URL = process.env.COS_BASE_URL || `https://${BUCKET}.cos.${REGION}.myqcloud.com`;

export async function uploadToCOS(
  base64Data: string,
  folder: string,
  filename: string
): Promise<string> {
  // 去掉 data:image/...;base64, 前缀
  const matches = base64Data.match(/^data:([^;]+);base64,(.+)$/);
  if (!matches) throw new Error("Invalid Base64 data");

  const mimeType = matches[1];
  const buffer = Buffer.from(matches[2], "base64");
  const key = `${folder}/${Date.now()}-${filename}`;

  return new Promise((resolve, reject) => {
    cos.putObject(
      {
        Bucket: BUCKET,
        Region: REGION,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
      },
      (err) => {
        if (err) reject(err);
        else resolve(`${BASE_URL}/${key}`);
      }
    );
  });
}

export { BUCKET, REGION, BASE_URL };

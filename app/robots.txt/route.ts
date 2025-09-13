
import { NextResponse } from "next/server";

export async function GET() {
  const content = `
User-agent: *
Disallow: /dashboard/
Disallow: /api/
Allow: /

Sitemap: ${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml
  `.trim();

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

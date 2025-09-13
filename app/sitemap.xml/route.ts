// app/sitemap.xml/route.ts
import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { productsTable } from "@/drizzle/schema";

export async function GET() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.groupengineering237.com";

  // Static pages with optional lastmod (set to today)
  const today = new Date().toISOString();
  const staticPages = [
    { path: "", priority: 1.0, lastmod: today }, // Homepage
    { path: "about", priority: 0.8, lastmod: today },
    { path: "services", priority: 0.8, lastmod: today },
    { path: "projects", priority: 0.9, lastmod: today },
    { path: "blog", priority: 0.7, lastmod: today },
    { path: "contact", priority: 0.7, lastmod: today },
  ];

  // Fetch dynamic projects
  const projects = await db.select().from(productsTable);
  const projectPages = projects.map((project) => ({
    path: `projects/${project.id}`,
    priority: 0.9,
    lastmod: project.updatedAt ? new Date(project.updatedAt).toISOString() : today,
  }));

  const allPages = [...staticPages, ...projectPages];

  // Build XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map(
      (page) => `
  <url>
    <loc>${siteUrl}/${page.path}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

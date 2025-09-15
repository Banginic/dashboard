import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import {
  LocationTable,
  ProjectInfoTable,
  ContactTable,
} from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const revalidate = 120;

export async function GET() {
  try {
    const projectDetails = await db
      .select({
        // Contact table
        whatsApp: ContactTable.whatsApp,
        facebook: ContactTable.facebook,
        instagram: ContactTable.instagram,
        tiktok: ContactTable.tiktok,
        email: ContactTable.email,
        phone: ContactTable.phone,

        // Project table
        projectName: ProjectInfoTable.projectName,

        // Location table
        address: LocationTable.address,
        city: LocationTable.city,
        country: LocationTable.country,

        createdAt: ContactTable.createdAt,
        updatedAt: ContactTable.updatedAt,
      })
      .from(ContactTable)
      .innerJoin(
        ProjectInfoTable,
        eq(ProjectInfoTable.id, ContactTable.projectId)
      )
      .innerJoin(
        LocationTable,
        eq(LocationTable.projectId, ProjectInfoTable.id)
      );

    return NextResponse.json(
      { success: true, data: projectDetails, message: 'Project details fetched successfully' },
     
    {
      status: 200,
      headers: {'Cache-Control': "public, s-maxage=120, stale-while-revalidating=300"}
    }
    );
  } catch (ex: unknown) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.message, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Error Fetching project details", data: [] },
      { status: 500 }
    );
  }
}

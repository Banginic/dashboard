import { db } from "@/drizzle/index";
import { ContactTable } from '@/drizzle/schema'
import { protectRoutes } from "@/lib/protectRoutes";
import { NextResponse } from "next/server";

export const revalidate = 120;
// Get details
export async function GET() {
  try {
  const session = await protectRoutes(true)
    const contactInfo = await db.select().from(ContactTable);

    if (contactInfo.length === 0) {
      return NextResponse.json(
        { success: true, messge: "No contact Info available", data: [] },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        messge: "success fetching contact info",
        data: contactInfo,
      },
    {
      status: 200,
      headers: {'Cache-Control': "public, s-maxage=120, stale-while-revalidating=300"}
    }
    );
  } catch (ex: unknown) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, messge: ex.message, data: [] },
        { status: 500 }
      );
    }
  }
  return NextResponse.json(
    { success: false, messge: "Error getting contact information", data: [] },
    { status: 500 }
  );
}
// CREATE contact IF NOT AVAILABLE
export async function POST (req: Request){
  try {
  const session = await protectRoutes(true)
    const { searchParams} = new URL(req.url)
    const projectId = searchParams.get('project_id')

      const body = await req.json();

     
        if (!body) {
          return NextResponse.json(
            { success: false, messge: "Updated values are required", data: [] },
            { status: 400 }
          );
        }
        if (!projectId) {
          return NextResponse.json(
            { success: false, messge: "Project ID is required required", data: [] },
            { status: 400 }
          );
        }
        const { phone, email, instagram, tiktok, whatsApp, facebook} = body;
    
        const contactInfo = await db
          .select()
          .from(ContactTable)
        //   .where(eq(contactInfoTable.id, projectId));

        let contact 
    
        // NO PROJECT EXIST......
        if (contactInfo.length === 0) {
          contact = await db.insert(ContactTable)
          .values({ tiktok, phone, email, instagram, whatsApp, facebook, projectId })
           return NextResponse.json(
          {
            success: true,
            messge: "success creating contact information",
            data: contact,
          },
          { status: 201 }
        );
        }
    
        //PROJECT EXIST......
        //    if (!projectId) {
        //   return NextResponse.json(
        //     { success: false, messge: "Project ID is required", data: [] },
        //     { status: 400 }
        //   );
        // }
        contact = await db
          .update(ContactTable)
          .set({ tiktok, phone, email, instagram, whatsApp, facebook});
        return NextResponse.json(
          {
            success: true,
            messge: "success updating contact information",
            data: contact,
          },
          { status: 202 }
        );
      } catch (ex: unknown) {
       
        if (ex instanceof Error) {
          return NextResponse.json(
            { success: false, messge: ex.message, data: [] },
            { status: 500 }
          );
        }
      }
      return NextResponse.json(
        { success: false, messge: "Error updating contact information", data: [] },
        { status: 500 }
      );
}
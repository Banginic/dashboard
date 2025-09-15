import { db } from "@/drizzle/index";
import { LocationTable } from '@/drizzle/schema'
import { protectRoutes } from "@/lib/protectRoutes";
import { NextResponse } from "next/server";

export const revalidate = 120;
// Get details
export async function GET() {
  const session = await protectRoutes(true)
  try {
    const projectInfo = await db.select().from(LocationTable);

    if (projectInfo.length === 0) {
      return NextResponse.json(
        { success: true, messge: "No address Info available", data: [] },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        messge: "success fetching address info",
        data: projectInfo,
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
    { success: false, messge: "Error getting address information", data: [] },
    { status: 500 }
  );
}
// CREATE ADDRESS IF NOT AVAILABLE
export async function POST (req: Request){
    const { searchParams} = new URL(req.url)
    const projectId = searchParams.get('project_id')

      const body = await req.json();
      try {
        const session = await protectRoutes(true)
     
        if (!body) {
          return NextResponse.json(
            { success: false, messge: "Updated values are required", data: [] },
            { status: 400 }
          );
        }
        if (!projectId) {
          return NextResponse.json(
            { success: false, messge: "Project ID required", data: [] },
            { status: 400 }
          );
        }
        const { country, state, city, address: newAddress, currency, language } = body;
    
        const projectInfo = await db
          .select()
          .from(LocationTable)
        //   .where(eq(ProjectInfoTable.id, projectId));

        let address 
    
        // NO PROJECT EXIST......
        if (projectInfo.length === 0) {
          address = await db.insert(LocationTable)
          .values({ currency, country, projectId, state, city, address:newAddress, language, mapPin: {lat: '', lgn: ''}})
           return NextResponse.json(
          {
            success: true,
            messge: "success creating address information",
            data: address,
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
        address = await db
          .update(LocationTable)
          .set({ country, state, city, address: newAddress, currency, language});
        return NextResponse.json(
          {
            success: true,
            messge: "success updating address information",
            data: address,
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
        { success: false, messge: "Error updating address information", data: [] },
        { status: 500 }
      );
}
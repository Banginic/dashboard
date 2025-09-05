import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { ProjectInfoTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// Get details
export async function GET() {
  try {
    const projectInfo = await db.select().from(ProjectInfoTable);

    if (projectInfo.length === 0) {
      return NextResponse.json(
        { success: true, messge: "No project Info available", data: [] },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        messge: "success fetching project infor",
        data: projectInfo,
      },
      { status: 500 }
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
    { success: false, messge: "Error getting project information", data: [] },
    { status: 500 }
  );
}

// Update details
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("project_id");

  const body = await req.json();
  try {
    // if (!projectId) {
    //   return NextResponse.json(
    //     { success: false, messge: "Project ID is required", data: [] },
    //     { status: 400 }
    //   );
    // }
    if (!body) {
      return NextResponse.json(
        { success: false, messge: "Updated values are required", data: [] },
        { status: 400 }
      );
    }
    const { projectName, tagLine } = body;

    const projectInfo = await db
      .select()
      .from(ProjectInfoTable)
    //   .where(eq(ProjectInfoTable.id, projectId));
    let project 

    // NO PROJECT EXIST......
    if (projectInfo.length === 0) {
      project = await db.insert(ProjectInfoTable)
      .values({ projectName, tagLine})
       return NextResponse.json(
      {
        success: true,
        messge: "success updating project information",
        data: project,
      },
      { status: 201 }
    );
    }

    //PROJECT EXIST......
    project = await db
      .update(ProjectInfoTable)
      .set({ projectName, tagLine });
    return NextResponse.json(
      {
        success: true,
        messge: "success updating project information",
        data: project,
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
    { success: false, messge: "Error updating project information", data: [] },
    { status: 500 }
  );
}

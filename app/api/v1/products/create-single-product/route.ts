import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { productsTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { protectRoutes } from "@/lib/protectRoutes";
import cloudinary from "@/lib/cloudinary";


export async function POST(req: Request) {
  try {
    const session = await protectRoutes(true)
    const formData = await req.formData();

   const photos = formData.getAll("photos") as File[]; // 👈 IMPORTANT
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const owner = formData.get("owner") as string;
    const description = formData.get("description") as string;
    const rating = formData.get("rating") as string;

    if (!name || !owner || !category) {
      return NextResponse.json(
        { success: false, error: "Category is required", data: [] },
        { status: 400 }
      );
    }
    if (photos?.length === 0) {
        return NextResponse.json(
            { success: false, name: "Photo is required", data: [] },
            { status: 400 }
        );
    }

    const existCategory = await db
      .select()
      .from(productsTable)
      .where(
        and(
          eq(productsTable.name, name),
          eq(productsTable.category, category)
        )
      )
      .limit(1);

    if (existCategory.length === 1) {

      return NextResponse.json(
        { success: false, name: "Project Already Exist", data: [] },
        { status: 400 }
      );
    }
 
      // ✅ Upload each photo to Cloudinary
  const uploadedUrls: string[] = [];
 for ( const file of photos){
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResponse = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
        .upload_stream(
            {
                folder: 'group-engineering projects'
            },
            (error, result) => {
                if(error) reject(error);
                else resolve(result)
            }
        ).end(buffer)
    })
    uploadedUrls.push(uploadResponse.secure_url)
 }



    await db
      .insert(productsTable)
      .values({
        name,
        category,
        owner,
        description,
        rating: Number(rating),
        photos: uploadedUrls,
      })
      .returning();

    return NextResponse.json(
      { success: true, name: "Project created successfully", data: [] },
      { status: 201 }
    );
  } catch (ex: unknown) {
    console.log(ex)
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.name, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Project Server Error", data: [] },
      { status: 500 }
    );
  }
}

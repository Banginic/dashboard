import { db } from "@/drizzle/index";
import { NextResponse } from "next/server";
import { productsTable } from "@/drizzle/schema";
import { and, eq } from "drizzle-orm";
import cloudinary from "@/lib/cloudinary";
import { rejects } from "assert";
import { error } from "console";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

   const photos = formData.getAll("photos") as File[]; // 👈 IMPORTANT
    const subCategory = formData.get("subCategory") as string;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const alergies = formData.get("allergies") as string;
    const description = formData.get("description") as string;
    const rating = formData.get("rating") as string;

    if (!name || !subCategory || !category) {
      return NextResponse.json(
        { success: false, error: "Category is required", data: [] },
        { status: 400 }
      );
    }
    if (photos?.length === 0) {
        return NextResponse.json(
            { success: false, name: "Photo is required" },
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
        { success: false, name: "Product Already Exist", data: [] },
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
                folder: 'daisy-kitchen products'
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
        price: Number(price),
        subCategory,
        category,
        alergies,
        description,
        rating: Number(rating),
        photos: uploadedUrls,
      })
      .returning();

    return NextResponse.json(
      { success: true, name: "Category created successfully", data: [] },
      { status: 201 }
    );
  } catch (ex: unknown) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { success: false, error: ex.name, data: [] },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Category Server Error", data: [] },
      { status: 500 }
    );
  }
}

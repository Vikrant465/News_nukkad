import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb"


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("news_charcha"); // choose DB name
    const blogs = await db.collection("blog").find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json(blogs);
  } catch (error) {
    console.error("❌ Error fetching blogs:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title,slug, content,category, imageName, videoName } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ success: false, error: "Title and Content are required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("news_charcha");
    const collection = db.collection("blog");

    const newBlog = {
      title,
      content,
      slug,
      category,
      imageName: imageName || null,
      videoName: videoName || null,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newBlog);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("❌ Error inserting blog:", error);
    return NextResponse.json({ success: false, error: "Failed to insert blog" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "No Blog ID found" },
        { status: 400 }
      );
    }
    console.log(id)
    const client = await clientPromise;
    const db = client.db("news_charcha");

    



    const result = await db.collection("blog").deleteOne({
      _id: new ObjectId(id as string),
    });
    console.log("result : ", result)
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
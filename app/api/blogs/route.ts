import clientPromise from "@/app/lib/mongodb";
import { NextResponse } from "next/server";

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
    const client = await clientPromise;
    const db = client.db("news_charcha");
    const body = await req.json();

    const newBlog = {
      title: body.title,
      content: body.content,
      image: body.image || null,
      video: body.video || null,
      createdAt: new Date(),
    };

    const result = await db.collection("blog").insertOne(newBlog);

    return NextResponse.json({ ...newBlog, _id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("❌ Error saving blog:", error);
    return NextResponse.json({ error: "Failed to save blog" }, { status: 500 });
  }
}

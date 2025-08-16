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

// export async function DELETE(req :){
//   try{
//     // const { searchParams } = new URL(req.url);
//     const id = req._id;
//     if(!id){
//       return NextResponse.json({error : "No Blog ID found"}, { status : 400});
//     }
//     const client = await clientPromise;
//     const db = client.db("news_charcha");
//     const result = await db.collection("blog").deleteOne({_id: new ObjectId("id") });
//     if(result.deletedCount === 0){
//       return NextResponse.json({ error: "Blog not found" }, { status: 404 })
//     }
//     return NextResponse.json({message : "Blog deleted Successfully"})
//   }catch (error) {
//     console.error("❌ Error deleting blog:", error);
//     return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
//   }
// }
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json(); // <-- frontend must send JSON { id }

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
    console.log("result : ",result)
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
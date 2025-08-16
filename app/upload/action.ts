'use server';

import clientPromise from '../lib/mongodb';

export async function uploadBlog(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  try {
    const client = await clientPromise;
    const db = client.db('news_charcha'); // change DB name if needed
    const blogs = db.collection('blog');

    const new_blog = {
      title,
      content,
      createdAt: new Date(),
    };

    await blogs.insertOne(new_blog);
    return { success: true };
  } catch (err) {
    console.error('❌ Error inserting blog into MongoDB:', err);
    return { success: false, error: 'DB insert failed' };
  }
}

'use server';

import fs from 'fs';
import path from 'path';
import { writeFile } from 'fs/promises';

export async function uploadBlog(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const image = formData.get('image') as File | null;
  const video = formData.get('video') as File | null;

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  let imageName = '';
  let videoName = '';

  if (image && typeof image === 'object') {
    const bytes = await image.arrayBuffer();
    imageName = `${Date.now()}-${image.name}`;
    await writeFile(path.join(uploadsDir, imageName), Buffer.from(bytes));
  }

  if (video && typeof video === 'object') {
    const bytes = await video.arrayBuffer();
    videoName = `${Date.now()}-${video.name}`;
    await writeFile(path.join(uploadsDir, videoName), Buffer.from(bytes));
  }

  const blog = {
    title,
    content,
    image: imageName,
    video: videoName,
    createdAt: new Date().toISOString(),
  };

  const dbPath = path.join(process.cwd(), 'data', 'blogs.json');
  const existing = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath, 'utf8')) : [];
  existing.unshift(blog);
  fs.writeFileSync(dbPath, JSON.stringify(existing, null, 2));

  return { success: true };
}

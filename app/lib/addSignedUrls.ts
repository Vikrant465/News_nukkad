// lib/addSignedUrls.ts
import axios from "axios";

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  category: string[];
  imageName?: string;
  videoName?: string;
  createdAt: string;
  imageUrl?: string;
  videoUrl?: string;
};

export async function addSignedUrls(post: BlogPost): Promise<BlogPost> {
  let signedImageUrl: string | undefined = undefined;
  let signedVideoUrl: string | undefined = undefined;

  if (post.imageName) {
    try {
      const res = await axios.get<{ url: string }>(
        `/api/s3/getimages?fileName=${encodeURIComponent(post.imageName)}`
      );
      signedImageUrl = res.data.url;
    } catch (err) {
      console.error(`❌ Failed to fetch signed URL for ${post.imageName}`, err);
    }
  }

  if (post.videoName) {
    try {
      const res = await axios.get<{ url: string }>(
        `/api/s3/getvideos?fileName=${encodeURIComponent(post.videoName)}`
      );
      signedVideoUrl = res.data.url;
    } catch (err) {
      console.error(`❌ Failed to fetch signed URL for ${post.videoName}`, err);
    }
  }

  return {
    ...post,
    imageUrl: signedImageUrl,
    videoUrl: signedVideoUrl,
  };
}

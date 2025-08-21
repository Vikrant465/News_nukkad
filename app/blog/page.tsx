'use client';
import { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard';
import Nav from "../../components/nav";
import axios from 'axios';

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  imageName?: string;
  videoName?: string;
  createdAt: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res1 = await axios.get<BlogPost[]>('/api/blogs');
        const data = res1.data;
        // console.log(data);
        const blogsWithSignedUrls = await Promise.all(
          data.map(async (post) => {
            let signedImageUrl: string | undefined = undefined;
            let signedVideoUrl: string | undefined = undefined;

            if (post.imageName) {
              try {
                const res2 = await axios.get<{ url: string }>(
                  `/api/s3/getimages?fileName=${encodeURIComponent(post.imageName)}`
                );
                signedImageUrl = res2.data.url;
                // console.log("Signed Image URL:", signedImageUrl);
              } catch (err) {
                console.error(`❌ Failed to fetch signed URL for ${post.imageName}`, err);
              }
            }

            if (post.videoName) {
              try {
                const res3 = await axios.get<{ url: string }>(
                  `/api/s3/getvideos?fileName=${encodeURIComponent(post.videoName)}`
                );
                signedVideoUrl = res3.data.url;
                console.log("✅ Signed Video URL:", signedVideoUrl);
              } catch (err) {
                console.error(`❌ Failed to fetch signed URL for ${post.videoName}`, err);
              }
            }

            return {
              ...post,
              imageUrl: signedImageUrl,
              videoUrl: signedVideoUrl,
            };
          })
        );

        setBlogs(blogsWithSignedUrls);
        setBlogs(blogsWithSignedUrls);
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300'>
      <Nav />
      <div className="max-w-3xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
        {loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          blogs.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}

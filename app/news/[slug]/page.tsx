'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Nav from "../../../components/nav";
import axios from 'axios';
import { BlogPost, addSignedUrls } from "../../lib/addSignedUrls";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res1 = await axios.get<BlogPost[]>('/api/blogs');
        const data1 = res1.data;
        const found = data1.find((b) => b.slug === slug);
        
        console.log("Found blog:", found);
        console.log("Searching for slug:", slug);
        console.log("All slugs:", data1.map(b => b.slug));
        if (!found) {
          setPost(null);
          return;
        }

        // ✅ add signed URLs
        const enriched = await addSignedUrls(found);
        setPost(enriched);
      } catch (err) {
        console.error("❌ Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [slug]);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;
  if (!post) return <p className="text-center mt-10">Blog not found.</p>;

  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
      <Nav />
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 mb-4">
          Posted on: {new Date(post.createdAt).toLocaleString()}
        </p>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="my-3 w-full rounded-lg object-cover"
          />
        )}
        <p className="whitespace-pre-line leading-relaxed mb-4">{post.content}</p>


        {post.videoUrl && (
          <video controls className="my-3 w-full max-h-96 rounded-lg">
            <source src={post.videoUrl} />
          </video>
        )}
      </div>
    </div>
  );
}

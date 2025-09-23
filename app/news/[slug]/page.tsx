'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Nav from "../../../components/nav";
import axios from 'axios';

type BlogPost = {
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

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await axios.get<BlogPost[]>('/api/blogs');
        const data = res.data;

        // match by slug
        const found = data.find((b) => b.slug === slug);
        setPost(found || null);
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
        <p className="whitespace-pre-line leading-relaxed mb-4">{post.content}</p>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            className="my-3 w-full rounded-lg object-cover"
          />
        )}
        {post.videoUrl && (
          <video controls className="my-3 w-full max-h-96 rounded-lg">
            <source src={post.videoUrl} />
          </video>
        )}
      </div>
    </div>
  );
}

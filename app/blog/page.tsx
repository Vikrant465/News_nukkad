'use client';
import { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard';
import Nav from "../../components/nav";

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  image?: string ;
  video?: string ;
  createdAt: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading , setLoading] = useState(true);
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data: BlogPost[] = await res.json();
        console.log(data);
        setBlogs(data);
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

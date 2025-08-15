'use client';
import { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard';
import Nav from "../../components/nav";

type BlogPost = {
  title: string;
  content: string;
  image?: string;
  video?: string;
  createdAt: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then((data: BlogPost[]) => setBlogs(data));
  }, []);

  return (
    <div className='flex flex-col min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300'>
      <Nav />
      <div className="max-w-3xl w-full mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
      {blogs.map((post, idx) => (
        <BlogCard key={idx} post={post} />
      ))}
    </div>
    </div>
  );
}

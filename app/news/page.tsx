'use client';
import { useEffect, useState } from 'react';
import Nav from "../../components/nav";
import axios from 'axios';
import Link from "next/link";
import { BlogPost, addSignedUrls } from "../lib/addSignedUrls";
import { Button } from '@heroui/react';
import { useSession } from 'next-auth/react';

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: session } = useSession(); 
  const adminEmails = ["truescopeyt@gmail.com"];
  const isAdmin = adminEmails.includes(session?.user?.email || "");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res1 = await axios.get<BlogPost[]>('/api/blogs');
        const data = res1.data;

        // ✅ enrich with signed URLs
        const blogsWithSignedUrls = await Promise.all(
          data.map((post) => addSignedUrls(post))
        );

        setBlogs(blogsWithSignedUrls);
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);
  async function handleDelete(id: string) {
  if (!confirm("Are you sure you want to delete this blog?")) return;

  try {
    const res = await axios.delete("/api/blogs", {
      data: { id },
      headers: { "Content-Type": "application/json" },
    });

    if (res.status === 200) {
      alert("Blog deleted!");
      setBlogs((prev) => prev.filter((b) => b._id !== id)); // remove without reload
    }
  } catch (err) {
    console.error("❌ Error deleting blog:", err);
    alert("Failed to delete blog");
  }
}


  // ✅ category options
  const selection = [
    { label: "National", key: "national" },
    { label: "International", key: "international" },
    { label: "Sports", key: "sports" },
    { label: "Cricket", key: "cricket" },
    { label: "Entertainment", key: "entertainment" },
    { label: "Business", key: "business" },
    { label: "Tech", key: "tech" },
    { label: "All", key: "all" },
  ];

  // ✅ filter blogs based on selected category
  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((post) => post.category.includes(selectedCategory));

  return (
    <div className="flex flex-col min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
      <Nav />

      {/* ✅ Category Buttons */}
      <div className="flex flex-wrap justify-center gap-3 p-2 border-b border-gray-200 dark:border-gray-700">
        {selection.map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedCategory(item.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${selectedCategory === item.key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
              }
            `}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col max-w-3xl w-full mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold mb-4 text-center">
          {selectedCategory === "all"
            ? "NEWS"
            : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
        </h1>

        <div className="flex flex-col gap-7">
          {loading ? (
            <p>Loading blogs...</p>
          ) : filteredBlogs.length === 0 ? (
            <p>No blogs available for this category.</p>
          ) : (
            filteredBlogs.map((post) => (
              <div
                key={post._id}
                className="p-4 rounded-lg shadow flex justify-between  bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
              >
                <Link href={`/news/${post.slug}`}>
                  <h2 className="text-lg font-semibold cursor-pointer">
                    {post.title}
                  </h2>
                </Link>

                {/* Delete Button */}
                {isAdmin && (
                <Button
                  size='sm'
                  color='danger'
                  variant="ghost"
                  onPress={() => handleDelete(post._id)}
                  // className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </Button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

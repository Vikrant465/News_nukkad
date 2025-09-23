'use client';
import { useEffect, useState } from 'react';
import Nav from "../../components/nav";
import axios from 'axios';
import Link from "next/link";
type BlogPost = {
  _id: string;
  title: string;
  slug: string;   // ✅ custom slug provided by user
  content: string;
  category: string[];
  imageName?: string;
  videoName?: string;
  createdAt: string;
  imageUrl?: string;
  videoUrl?: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res1 = await axios.get<BlogPost[]>('/api/blogs');
        const data = res1.data;

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
      } catch (err) {
        console.error("❌ Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

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
              ${
                selectedCategory === item.key
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
              // <BlogCard key={post._id} post={post} />
              <Link
                key={post._id}
                href={`/news/${post.slug}`} // ✅ open dynamic page
                className="p-4 rounded-lg shadow bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
              >
                <h2 className="text-lg font-semibold cursor-pointer">
                    {post.title}
                  </h2>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

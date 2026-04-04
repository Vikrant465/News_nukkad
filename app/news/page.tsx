// 'use client';
// import { useEffect, useState } from 'react';
// import Nav from "../../components/nav";
// import axios from 'axios';
// import Link from "next/link";
// import { BlogPost, addSignedUrls } from "../lib/addSignedUrls";
// import { Button } from '@heroui/react';
// import { useSession } from 'next-auth/react';
// import { Router } from 'next/router';

// export default function BlogPage() {
//   const [blogs, setBlogs] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");

//   const { data: session } = useSession();
//   const adminEmails = ["truescopeyt@gmail.com", "vikrant172singh@gmail.com"];
//   const isAdmin = adminEmails.includes(session?.user?.email || "");

//   useEffect(() => {
//     async function fetchBlogs() {
//       try {
//         const res1 = await axios.get<BlogPost[]>('/api/blogs');
//         const data = res1.data;

//         // ✅ enrich with signed URLs
//         const blogsWithSignedUrls = await Promise.all(
//           data.map((post) => addSignedUrls(post))
//         );

//         setBlogs(blogsWithSignedUrls);
//       } catch (err) {
//         console.error("❌ Error fetching blogs:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBlogs();
//   }, []);

//   // async function handleDelete(id: string) {
//   //   if (!confirm("Are you sure you want to delete this blog?")) return;

//   //   try {
//   //     const res = await axios.delete("/api/blogs", {
//   //       data: { id },
//   //       headers: { "Content-Type": "application/json" },
//   //     });

//       // if (res.status === 200) {
//       //   alert("Blog deleted!");
//       //   setBlogs((prev) => prev.filter((b) => b._id !== id)); // remove without reload
//       // }
//   //   } catch (err) {
//   //     console.error("❌ Error deleting blog:", err);
//   //     alert("Failed to delete blog");
//   //   }
//   // }
//   async function handleDelete(blog: BlogPost) {
//     if (!confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       // 1. Delete image from S3 (if exists)
//       if (blog.imageName) {
//         await fetch("/api/s3/getimages", {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ fileName: blog.imageName }),
//         });
//       }

//       // 2. Delete video from S3 (if exists)
//       if (blog.videoName) {
//         await fetch("/api/s3/getvideos", {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ fileName: blog.videoName }),
//         });
//       }

//       // 3. Delete blog entry from MongoDB
//       const res = await fetch("/api/blogs", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: blog._id }),
//       });

//       if (res.status === 200) {
//         alert("Blog deleted!");
//         setBlogs((prev) => prev.filter((b) => b._id !== blog._id)); // remove without reload
//       }
//     } catch (error) {
//       alert("Failed to delete blog");
//       console.error(error);
//     }
//   }



//   // ✅ category options
//   const selection = [
//     { label: "National", key: "national" },
//     { label: "International", key: "international" },
//     { label: "Sports", key: "sports" },
//     { label: "Cricket", key: "cricket" },
//     { label: "Entertainment", key: "entertainment" },
//     { label: "Business", key: "business" },
//     { label: "Tech", key: "tech" },
//     { label: "All", key: "all" },
//   ];

//   // ✅ filter blogs based on selected category
//   const filteredBlogs =
//     selectedCategory === "all"
//       ? blogs
//       : blogs.filter((post) => post.category.includes(selectedCategory));

//   return (
//     <div className="flex flex-col min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
//       <Nav />

//       {/* ✅ Category Buttons */}
//       <div className="flex flex-wrap justify-center gap-3 p-2 border-b border-gray-200 dark:border-gray-700">
//         {selection.map((item) => (
//           <button
//             key={item.key}
//             onClick={() => setSelectedCategory(item.key)}
//             className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
//               ${selectedCategory === item.key
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
//               }
//             `}
//           >
//             {item.label}
//           </button>
//         ))}
//       </div>

//       <div className="flex flex-col max-w-3xl w-full mx-auto p-6 space-y-6">
//         <h1 className="text-3xl font-bold mb-4 text-center">
//           {selectedCategory === "all"
//             ? "NEWS"
//             : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
//         </h1>

//         <div className="flex flex-col gap-7">
//           {loading ? (
//             <p>Loading blogs...</p>
//           ) : filteredBlogs.length === 0 ? (
//             <p>No blogs available for this category.</p>
//           ) : (
//             filteredBlogs.map((post) => (
//               <div
//                 key={post._id}
//                 className="p-4 rounded-lg shadow flex justify-between  bg-white dark:bg-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-700 transition"
//               >
//                 <Link href={`/news/${post.slug}`}>
//                   <h2 className="text-lg font-semibold cursor-pointer">
//                     {post.title}
//                   </h2>
//                 </Link>

//                 {/* Delete Button */}
//                 {isAdmin && (
//                   <Button
//                     size='sm'
//                     color='danger'
//                     variant="ghost"
//                     onPress={() => handleDelete(post)}
//                   // className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
//                   >
//                     Delete
//                   </Button>
//                 )}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

// import BreakingTicker from "../../components/BreakingTicker";
import { useEffect, useState } from 'react';
import Nav from "../../components/nav";
import axios from 'axios';
import Link from "next/link";
import { BlogPost, addSignedUrls } from "../lib/addSignedUrls";
import { Button } from '@heroui/react';
import { useSession } from 'next-auth/react';

export default function NewsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: session } = useSession();
  const adminEmails = ["truescopeyt@gmail.com", "vikrant172singh@gmail.com"];
  const isAdmin = adminEmails.includes(session?.user?.email || "");

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await axios.get<BlogPost[]>('/api/blogs');

        const blogsWithSignedUrls = await Promise.all(
          res.data.map((post) => addSignedUrls(post))
        );

        setBlogs(blogsWithSignedUrls);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  async function handleDelete(blog: BlogPost) {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      if (blog.imageName) {
        await fetch("/api/s3/getimages", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: blog.imageName }),
        });
      }

      if (blog.videoName) {
        await fetch("/api/s3/getvideos", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileName: blog.videoName }),
        });
      }

      await fetch("/api/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog._id }),
      });

      setBlogs((prev) => prev.filter((b) => b._id !== blog._id));
    } catch (err) {
      console.error(err);
    }
  }

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

  const filteredBlogs =
    selectedCategory === "all"
      ? blogs
      : blogs.filter((post) => post.category.includes(selectedCategory));

  const heroPost = filteredBlogs[0];
  const secondaryPosts = filteredBlogs.slice(1, 5);
  const latestPosts = filteredBlogs.slice(5, 12);
  // const breakingNews = blogs.slice(0, 5);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white">
      <Nav />
      {/* <BreakingTicker headlines={breakingNews} /> */}
      {/* CATEGORY BAR */}
      <div className="flex flex-wrap justify-center gap-3 p-3 border-b">
        {selection.map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedCategory(item.key)}
            className={`px-4 py-1 rounded-full text-sm ${
              selectedCategory === item.key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-zinc-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-center mt-10">Loading...</p>
      ) : (
        <>
          {/* MAIN GRID */}
          <div className="max-w-7xl mx-auto p-4 grid lg:grid-cols-3 gap-6">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              {/* HERO */}
              {heroPost && (
                <Link href={`/news/${heroPost.slug}`}>
                  <div className="cursor-pointer">
                    {heroPost.imageUrl && (
                      <img
                        src={heroPost.imageUrl}
                        className="w-full h-[350px] object-cover rounded"
                      />
                    )}
                    <h1 className="text-2xl font-bold mt-3">
                      {heroPost.title}
                    </h1>
                  </div>
                </Link>
              )}

              {/* SECONDARY */}
              <div className="grid md:grid-cols-2 gap-4">
                {secondaryPosts.map((post) => (
                  <Link key={post._id} href={`/news/${post.slug}`}>
                    <div className="flex gap-3 hover:bg-gray-100 dark:hover:bg-zinc-800 p-2 rounded">
                      {post.imageUrl && (
                        <img
                          src={post.imageUrl}
                          className="w-24 h-24 object-cover rounded"
                        />
                      )}
                      <h2 className="text-sm font-semibold">
                        {post.title}
                      </h2>
                    </div>
                  </Link>
                ))}
              </div>

            </div>

            {/* SIDEBAR */}
            <div>
              <h2 className="font-bold text-lg mb-3">Latest News</h2>
              {latestPosts.map((post) => (
                <Link key={post._id} href={`/news/${post.slug}`}>
                  <p className="text-sm mb-2 hover:underline">
                    • {post.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* CATEGORY SECTIONS */}
          {selection.slice(0, -1).map((cat) => {
            const catPosts = blogs
              .filter((p) => p.category.includes(cat.key))
              .slice(0, 4);

            if (catPosts.length === 0) return null;

            return (
              <div key={cat.key} className="max-w-7xl mx-auto p-4">
                <h2 className="text-xl font-bold mb-3">
                  {cat.label}
                </h2>

                <div className="grid md:grid-cols-4 gap-4">
                  {catPosts.map((post) => (
                    <Link key={post._id} href={`/news/${post.slug}`}>
                      <div className="shadow rounded overflow-hidden">
                        {post.imageUrl && (
                          <img
                            src={post.imageUrl}
                            className="h-40 w-full object-cover"
                          />
                        )}
                        <div className="p-2">
                          <p className="text-sm font-semibold">
                            {post.title}
                          </p>

                          {isAdmin && (
                            <Button
                              size="sm"
                              color="danger"
                              variant="ghost"
                              onPress={() => handleDelete(post)}
                            >
                              Delete
                            </Button>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
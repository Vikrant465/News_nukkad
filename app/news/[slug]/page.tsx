'use client';
// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
import Nav from "../../../components/nav";
// import axios from 'axios';
import { BlogPost, addSignedUrls } from "../../lib/addSignedUrls";

// export default function BlogDetailPage() {
//   const { slug } = useParams();
//   const [post, setPost] = useState<BlogPost | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchBlog() {
//       try {
//         const res1 = await axios.get<BlogPost[]>('/api/blogs');
//         const data1 = res1.data;
//         const found = data1.find((b) => b.slug === slug);

//         // console.log("Found blog:", found);
//         // console.log("Searching for slug:", slug);
//         // console.log("All slugs:", data1.map(b => b.slug));
//         if (!found) {
//           setPost(null);
//           return;
//         }

//         // ✅ add signed URLs
//         const enriched = await addSignedUrls(found);
//         setPost(enriched);
//       } catch (err) {
//         console.error("❌ Error fetching blog:", err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchBlog();
//   }, [slug]);

//   if (loading) return <p className="text-center mt-10">Loading blog...</p>;
//   if (!post) return <p className="text-center mt-10">Blog not found.</p>;

//   return (
//     <div className="flex flex-col min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
//       <Nav />
//       <div className="max-w-3xl mx-auto p-6">
//         <h1 className="text-2xl sm:text-3xl font-bold mb-4">{post.title}</h1>
//         <p className="text-sm text-gray-500 mb-4">
//           Posted on: {new Date(post.createdAt).toLocaleString()}
//         </p>
//         {post.imageUrl && (
//           <img
//             src={post.imageUrl}
//             alt={post.title}
//             className="my-3 w-full rounded-lg object-cover"
//           />
//         )}
//         <p className="whitespace-pre-line leading-relaxed mb-4">{post.content}</p>


//         {post.videoUrl && (
//           <video controls className="my-3 w-full max-h-96 rounded-lg">
//             <source src={post.videoUrl} />
//           </video>
//         )}
//       </div>
//     </div>
//   );
// }


// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';

// import axios from 'axios';


// export default function SingleNewsPage() {
//   const { slug } = useParams();
//   const [post, setPost] = useState<BlogPost | null>(null);

//   useEffect(() => {
//     async function fetchPost() {
//       try {
//         const res = await axios.get<BlogPost[]>('/api/blogs');

//         const found = res.data.find((p) => p.slug === slug);

//         if (found) {
//           const enriched = await addSignedUrls(found);
//           setPost(enriched);
//         }
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     fetchPost();
//   }, [slug]);

//   if (!post) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   return (
//     <div className="bg-white dark:bg-zinc-900 min-h-screen text-black dark:text-white">
//       <Nav />

//       <div className="max-w-3xl mx-auto p-6">
//         <h1 className="text-3xl font-bold mb-4">
//           {post.title}
//         </h1>

//         {post.imageUrl && (
//           <img
//             src={post.imageUrl}
//             className="w-full rounded mb-4"
//           />
//         )}

//         <p className="text-gray-500 mb-2">
//           Category: {post.category}
//         </p>

//         <div className="text-lg leading-relaxed whitespace-pre-line">
//           {post.content}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
// import Nav from "../../../components/nav";
import axios from 'axios';
import Link from "next/link";
// import { BlogPost, addSignedUrls } from "../../lib/addSignedUrls";

export default function SingleNewsPage() {
  const { slug } = useParams();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);
  const [similarPosts, setSimilarPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get<BlogPost[]>('/api/blogs');

        const found = res.data.find((p) => p.slug === slug);

        if (found) {
          const enrichedPost = await addSignedUrls(found);
          setPost(enrichedPost);

          // ✅ enrich all blogs (for similar section)
          const enrichedBlogs = await Promise.all(
            res.data.map((b) => addSignedUrls(b))
          );

          setAllBlogs(enrichedBlogs);

          // ✅ filter similar news (same category, exclude current)
          const similar = enrichedBlogs
            .filter(
              (b) =>
                b.slug !== slug &&
                b.category?.some((cat) =>
                  found.category?.includes(cat)
                )
            )
            .slice(0, 4);

          setSimilarPosts(similar);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPost();
  }, [slug]);

  if (!post) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="bg-white dark:bg-zinc-900 min-h-screen text-black dark:text-white pb-20">
      <Nav />

      {/* MAIN ARTICLE */}
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">
          {post.title}
        </h1>

        {post.imageUrl && (
          <img
            src={post.imageUrl}
            className="w-full rounded mb-4"
          />
        )}

        <p className="text-gray-500 mb-2">
          Category: {post.category?.join(", ")}
        </p>

        <div className="text-lg leading-relaxed whitespace-pre-line">
          {post.content}
        </div>

        {post.videoUrl && (
          <video controls className="my-4 w-full rounded">
            <source src={post.videoUrl} />
          </video>
        )}
      </div>

      {/* 🔥 SIMILAR NEWS SECTION */}
      {similarPosts.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 pb-10">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">
            Related News
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {similarPosts.map((item) => (
              <Link key={item._id} href={`/news/${item.slug}`}>
                <div className="cursor-pointer rounded overflow-hidden shadow hover:shadow-md transition">
                  
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      className="w-full h-32 object-cover"
                    />
                  )}

                  <div className="p-2">
                    <p className="text-sm font-semibold line-clamp-2">
                      {item.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Nav from "../../components/nav";
import axios from 'axios';
import Link from "next/link";
import { BlogPost, addSignedUrls } from "../lib/addSignedUrls";
import { Button } from '@heroui/react';
import { useSession } from 'next-auth/react';
import GoogleAd from '../../components/GoogleAd';

// export default function NewsPage() {
//   const [blogs, setBlogs] = useState<BlogPost[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCategory, setSelectedCategory] = useState<string>("all");

//   const { data: session } = useSession();
//   const adminEmails = ["truescopeyt@gmail.com", "vikrant172singh@gmail.com","singhsmita128@gmail.com"];
//   const isAdmin = adminEmails.includes(session?.user?.email || "");

//   useEffect(() => {
//     async function fetchBlogs() {
//       try {
//         const res = await axios.get<BlogPost[]>('/api/blogs');
//         const blogsWithSignedUrls = await Promise.all(
//           res.data.map((post) => addSignedUrls(post))
//         );
//         setBlogs(blogsWithSignedUrls);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchBlogs();
//   }, []);

//   async function handleDelete(blog: BlogPost) {
//     if (!confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       if (blog.imageName) {
//         await fetch("/api/s3/getimages", {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ fileName: blog.imageName }),
//         });
//       }
//       if (blog.videoName) {
//         await fetch("/api/s3/getvideos", {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ fileName: blog.videoName }),
//         });
//       }
//       await fetch("/api/blogs", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: blog._id }),
//       });
//       setBlogs((prev) => prev.filter((b) => b._id !== blog._id));
//     } catch (err) {
//       console.error(err);
//     }
//   }

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

//   const filteredBlogs =
//     selectedCategory === "all"
//       ? blogs
//       : blogs.filter((post) => post.category.includes(selectedCategory));

//   const heroPost = filteredBlogs[0];
//   const secondaryPosts = filteredBlogs.slice(1, 4);
//   const sidebarPosts = filteredBlogs.slice(4, 10);
//   const remainingPosts = filteredBlogs.slice(10, 14);

//   return (
//     <div className="min-h-screen bg-[#f7f4ef] dark:bg-zinc-950 text-black dark:text-white font-serif">
//       <Nav />

//       {/* ── CATEGORY NAV BAR ── */}
//       <div className="bg-red-700 text-white">
//         <div className="max-w-7xl mx-auto flex flex-wrap align-middle justify-center gap-0 overflow-x-auto">
//           {selection.map((item) => (
//             <button
//               key={item.key}
//               onClick={() => setSelectedCategory(item.key)}
//               className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap
//                 ${selectedCategory === item.key
//                   ? 'bg-black text-white'
//                   : 'hover:bg-red-800'
//                 }`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* ── AD BANNER TOP ── */}
//       <div className="max-w-7xl mx-auto px-4 pt-3">
//         <GoogleAd slot="YOUR_BANNER_AD_SLOT_ID" format="horizontal" className="w-full" style={{ minHeight: 90 }} />
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-pulse text-red-700 font-bold tracking-widest uppercase text-sm">
//             Loading News…
//           </div>
//         </div>
//       ) : (
//         <div className="max-w-7xl mx-auto px-4 py-4 space-y-8">

//           {/* ══ SECTION HEADING ══ */}
//           <div className="text-center border-y-2 border-black dark:border-white py-2">
//             <h1 className="text-4xl font-black uppercase tracking-tight leading-none">
//               {selectedCategory === 'all'
//                 ? 'Top Stories'
//                 : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
//             </h1>
//           </div>

//           {/* ══ MAIN GRID: HERO + SECONDARY + SIDEBAR ══ */}
//           <div className="grid lg:grid-cols-12 gap-6">

//             {/* LEFT — HERO + SECONDARY */}
//             <div className="lg:col-span-8 space-y-4">

//               {/* HERO */}
//               {heroPost && (
//                 <div className="border-b-2 border-black dark:border-white pb-4">
//                   <Link href={`/news/${heroPost.slug}`}>
//                     <div className="group cursor-pointer">
//                       {heroPost.imageUrl && (
//                         <div className="overflow-hidden">
//                           <img
//                             src={heroPost.imageUrl}
//                             alt={heroPost.title}
//                             className="w-full h-[400px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
//                           />
//                         </div>
//                       )}
//                       <div className="mt-3">
//                         {heroPost.category?.[0] && (
//                           <span className="bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 mr-2">
//                             {heroPost.category[0]}
//                           </span>
//                         )}
//                         <h2 className="text-3xl font-black leading-tight mt-2 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
//                           {heroPost.title}
//                         </h2>
//                       </div>
//                     </div>
//                   </Link>
//                   {isAdmin && (
//                     <Button size="sm" color="danger" variant="ghost" onPress={() => handleDelete(heroPost)} className="mt-2">
//                       Delete
//                     </Button>
//                   )}
//                 </div>
//               )}

//               {/* SECONDARY 3-COLUMN GRID */}
//               <div className="grid md:grid-cols-3 gap-4 border-b border-gray-300 dark:border-zinc-700 pb-4">
//                 {secondaryPosts.map((post, i) => (
//                   <div key={post._id} className={`${i < secondaryPosts.length - 1 ? 'md:border-r border-gray-300 dark:border-zinc-700 md:pr-4' : ''}`}>
//                     <Link href={`/news/${post.slug}`}>
//                       <div className="group cursor-pointer">
//                         {post.imageUrl && (
//                           <div className="overflow-hidden mb-2">
//                             <img
//                               src={post.imageUrl}
//                               alt={post.title}
//                               className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
//                             />
//                           </div>
//                         )}
//                         {post.category?.[0] && (
//                           <span className="text-red-700 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest">
//                             {post.category[0]}
//                           </span>
//                         )}
//                         <h3 className="text-sm font-bold leading-snug mt-1 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
//                           {post.title}
//                         </h3>
//                       </div>
//                     </Link>
//                     {isAdmin && (
//                       <Button size="sm" color="danger" variant="ghost" onPress={() => handleDelete(post)} className="mt-1">
//                         Delete
//                       </Button>
//                     )}
//                   </div>
//                 ))}
//               </div>

//               {/* AD IN MIDDLE */}
//               <GoogleAd slot="YOUR_INLINE_AD_SLOT_ID" format="rectangle" className="w-full" style={{ minHeight: 250 }} />

//               {/* REMAINING POSTS — 2-COLUMN */}
//               {remainingPosts.length > 0 && (
//                 <div className="grid md:grid-cols-2 gap-4">
//                   {remainingPosts.map((post) => (
//                     <div key={post._id} className="flex gap-3 border-b border-gray-200 dark:border-zinc-800 pb-3">
//                       {post.imageUrl && (
//                         <img src={post.imageUrl} alt={post.title} className="w-20 h-20 object-cover flex-shrink-0" />
//                       )}
//                       <div className="flex-1">
//                         <Link href={`/news/${post.slug}`}>
//                           <p className="text-xs font-bold leading-snug hover:text-red-700 dark:hover:text-red-400 cursor-pointer transition-colors">
//                             {post.title}
//                           </p>
//                         </Link>
//                         {isAdmin && (
//                           <Button size="sm" color="danger" variant="ghost" onPress={() => handleDelete(post)} className="mt-1">
//                             Delete
//                           </Button>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* RIGHT — SIDEBAR */}
//             <div className="lg:col-span-4 space-y-4">

//               {/* Sidebar Ad */}
//               <GoogleAd slot="YOUR_SIDEBAR_AD_SLOT_ID" format="vertical" style={{ minHeight: 250, width: '100%' }} />

//               {/* Latest News list */}
//               <div className="border border-gray-300 dark:border-zinc-700">
//                 <div className="bg-black text-white px-3 py-2">
//                   <h2 className="text-xs font-black uppercase tracking-widest">Latest News</h2>
//                 </div>
//                 <ul className="divide-y divide-gray-200 dark:divide-zinc-700">
//                   {sidebarPosts.map((post) => (
//                     <li key={post._id} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
//                       <Link href={`/news/${post.slug}`}>
//                         <div className="flex gap-2">
//                           {post.imageUrl && (
//                             <img src={post.imageUrl} alt={post.title} className="w-14 h-14 object-cover flex-shrink-0" />
//                           )}
//                           <p className="text-xs font-semibold leading-snug hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer">
//                             {post.title}
//                           </p>
//                         </div>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Second Sidebar Ad */}
//               <GoogleAd slot="YOUR_SIDEBAR_AD_SLOT_ID_2" format="vertical" style={{ minHeight: 200, width: '100%' }} />
//             </div>
//           </div>

//           {/* ══ CATEGORY SECTIONS ══ */}
//           {selection.slice(0, -1).map((cat) => {
//             const catPosts = blogs.filter((p) => p.category.includes(cat.key)).slice(0, 4);
//             if (catPosts.length === 0) return null;

//             return (
//               <div key={cat.key}>
//                 {/* Section Header */}
//                 <div className="flex items-center gap-3 mb-4">
//                   <div className="h-6 w-1.5 bg-red-700" />
//                   <h2 className="text-xl font-black uppercase tracking-tight">{cat.label}</h2>
//                   <div className="flex-1 h-px bg-gray-300 dark:bg-zinc-700" />
//                   <Link href={`/news?cat=${cat.key}`} className="text-xs text-red-700 dark:text-red-400 font-semibold uppercase tracking-wider hover:underline">
//                     More →
//                   </Link>
//                 </div>

//                 <div className="grid md:grid-cols-4 gap-4 border-b border-gray-300 dark:border-zinc-700 pb-6">
//                   {catPosts.map((post, i) => (
//                     <div key={post._id} className={`${i < catPosts.length - 1 ? 'md:border-r border-gray-200 dark:border-zinc-800 md:pr-3' : ''}`}>
//                       <Link href={`/news/${post.slug}`}>
//                         <div className="group cursor-pointer">
//                           {post.imageUrl && (
//                             <div className="overflow-hidden mb-2">
//                               <img
//                                 src={post.imageUrl}
//                                 alt={post.title}
//                                 className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
//                               />
//                             </div>
//                           )}
//                           <p className="text-xs font-bold leading-snug group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
//                             {post.title}
//                           </p>
//                         </div>
//                       </Link>
//                       {isAdmin && (
//                         <Button size="sm" color="danger" variant="ghost" onPress={() => handleDelete(post)} className="mt-1">
//                           Delete
//                         </Button>
//                       )}
//                     </div>
//                   ))}
//                 </div>

//                 {/* Ad after every 2nd category */}
//                 {['sports', 'business'].includes(cat.key) && (
//                   <div className="mt-4">
//                     <GoogleAd slot="YOUR_BETWEEN_SECTIONS_AD_SLOT_ID" format="horizontal" style={{ minHeight: 90, width: '100%' }} />
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {/* ── FOOTER AD ── */}
//           <GoogleAd slot="YOUR_FOOTER_AD_SLOT_ID" format="horizontal" style={{ minHeight: 90, width: '100%' }} />
//         </div>
//       )}
//     </div>
//   );
// }


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
  const secondaryPosts = filteredBlogs.slice(1, 4);
  const sidebarPosts = filteredBlogs.slice(4, 10);
  const remainingPosts = filteredBlogs.slice(10, 14);

  return (
    <div className="min-h-screen bg-[#f7f4ef] dark:bg-zinc-950 text-black dark:text-white font-serif">
      <Nav />

      {/* ── CATEGORY NAV BAR ── */}
      <div className="bg-red-700 text-white">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-0 overflow-x-auto justify-center">
          {selection.map((item) => (
            <button
              key={item.key}
              onClick={() => setSelectedCategory(item.key)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap
                ${selectedCategory === item.key
                  ? 'bg-black text-white'
                  : 'hover:bg-red-800'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── AD BANNER TOP ── */}
      <div className="max-w-7xl mx-auto px-4 pt-3">
        <GoogleAd slot="YOUR_BANNER_AD_SLOT_ID" format="horizontal" className="w-full" style={{ minHeight: 90 }} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-red-700 font-bold tracking-widest uppercase text-sm">
            Loading News…
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-8">

          {/* ══ SECTION HEADING ══ */}
          <div className="text-center border-y-2 border-black dark:border-white py-2">
            <h1 className="text-4xl font-black uppercase tracking-tight leading-none">
              {selectedCategory === 'all'
                ? 'Top Stories'
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} News`}
            </h1>
          </div>

          {/* ══ MAIN GRID: HERO + SECONDARY + SIDEBAR ══ */}
          <div className="grid lg:grid-cols-12 gap-6">

            {/* LEFT — HERO + SECONDARY */}
            <div className="lg:col-span-8 space-y-4">

              {/* HERO */}
              {heroPost && (
                <div className="border-b-2 border-black dark:border-white pb-4">
                  <Link href={`/news/${heroPost.slug}`}>
                    <div className="group cursor-pointer">
                      {heroPost.imageUrl && (
                        <div className="overflow-hidden">
                          <img
                            src={heroPost.imageUrl}
                            alt={heroPost.title}
                            className="w-full h-[400px] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                          />
                        </div>
                      )}
                      <div className="mt-3">
                        {heroPost.category?.[0] && (
                          <span className="bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 mr-2">
                            {heroPost.category[0]}
                          </span>
                        )}
                        <h2 className="text-3xl font-black leading-tight mt-2 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                          {heroPost.title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                  {isAdmin && (
                    <Button size="sm" color="danger" variant="ghost" onPress={() => handleDelete(heroPost)} className="mt-2">
                      Delete
                    </Button>
                  )}
                </div>
              )}

              {/* SECONDARY 3-COLUMN GRID */}
              <div className="grid md:grid-cols-3 gap-4 border-b border-gray-300 dark:border-zinc-700 pb-4">
                {secondaryPosts.map((post, i) => (
                  <div key={post._id} className={`${i < secondaryPosts.length - 1 ? 'md:border-r border-gray-300 dark:border-zinc-700 md:pr-4' : ''}`}>
                    <Link href={`/news/${post.slug}`}>
                      <div className="group cursor-pointer">
                        {post.imageUrl && (
                          <div className="overflow-hidden mb-2">
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        {post.category?.[0] && (
                          <span className="text-red-700 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest">
                            {post.category[0]}
                          </span>
                        )}
                        <h3 className="text-sm font-bold leading-snug mt-1 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                    {isAdmin && (
                      <Button size="sm" color="danger" variant="ghost" onPress={() => handleDelete(post)} className="mt-1">
                        Delete
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {/* AD IN MIDDLE */}
              <GoogleAd slot="YOUR_INLINE_AD_SLOT_ID" format="rectangle" className="w-full" style={{ minHeight: 250 }} />

              {/* REMAINING POSTS — 2-COLUMN */}
              {remainingPosts.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {remainingPosts.map((post) => (
                    <div key={post._id} className="flex gap-3 border-b border-gray-200 dark:border-zinc-800 pb-3">
                      {post.imageUrl && (
                        <img src={post.imageUrl} alt={post.title} className="w-20 h-20 object-cover flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <Link href={`/news/${post.slug}`}>
                          <p className="text-xs font-bold leading-snug hover:text-red-700 dark:hover:text-red-400 cursor-pointer transition-colors">
                            {post.title}
                          </p>
                        </Link>
                        {isAdmin && (
                          <Button size="sm" color="danger" variant="ghost" onPress={() => handleDelete(post)} className="mt-1">
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — SIDEBAR */}
            <div className="lg:col-span-4 space-y-4">

              {/* Sidebar Ad */}
              <GoogleAd slot="YOUR_SIDEBAR_AD_SLOT_ID" format="vertical" style={{ minHeight: 250, width: '100%' }} />

              {/* Latest News list */}
              <div className="border border-gray-300 dark:border-zinc-700">
                <div className="bg-black text-white px-3 py-2">
                  <h2 className="text-xs font-black uppercase tracking-widest">Latest News</h2>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-zinc-700">
                  {sidebarPosts.map((post) => (
                    <li key={post._id} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                      <Link href={`/news/${post.slug}`}>
                        <div className="flex gap-2">
                          {post.imageUrl && (
                            <img src={post.imageUrl} alt={post.title} className="w-14 h-14 object-cover flex-shrink-0" />
                          )}
                          <p className="text-xs font-semibold leading-snug hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer">
                            {post.title}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Second Sidebar Ad */}
              <GoogleAd slot="YOUR_SIDEBAR_AD_SLOT_ID_2" format="vertical" style={{ minHeight: 200, width: '100%' }} />
            </div>
          </div>

          {/* ══ CATEGORY SECTIONS ══ */}
          {selection.slice(0, -1).map((cat) => {
            const catPosts = blogs.filter((p) => p.category.includes(cat.key)).slice(0, 4);
            if (catPosts.length === 0) return null;

            return (
              <div key={cat.key}>
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-6 w-1.5 bg-red-700" />
                  <h2 className="text-xl font-black uppercase tracking-tight">{cat.label}</h2>
                  <div className="flex-1 h-px bg-gray-300 dark:bg-zinc-700" />
                  <Link href={`/news?cat=${cat.key}`} className="text-xs text-red-700 dark:text-red-400 font-semibold uppercase tracking-wider hover:underline">
                    More →
                  </Link>
                </div>

                <div className="grid md:grid-cols-4 gap-4 border-b border-gray-300 dark:border-zinc-700 pb-6">
                  {catPosts.map((post, i) => (
                    <div key={post._id} className={`${i < catPosts.length - 1 ? 'md:border-r border-gray-200 dark:border-zinc-800 md:pr-3' : ''}`}>
                      <Link href={`/news/${post.slug}`}>
                        <div className="group cursor-pointer">
                          {post.imageUrl && (
                            <div className="overflow-hidden mb-2">
                              <img
                                src={post.imageUrl}
                                alt={post.title}
                                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                          )}
                          <p className="text-xs font-bold leading-snug group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                            {post.title}
                          </p>
                        </div>
                      </Link>
                      {isAdmin && (
                        <Button size="sm" color="danger" variant="ghost" onPress={() => handleDelete(post)} className="mt-1">
                          Delete
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Ad after every 2nd category */}
                {['sports', 'business'].includes(cat.key) && (
                  <div className="mt-4">
                    <GoogleAd slot="YOUR_BETWEEN_SECTIONS_AD_SLOT_ID" format="horizontal" style={{ minHeight: 90, width: '100%' }} />
                  </div>
                )}
              </div>
            );
          })}

          {/* ── FOOTER AD ── */}
          <GoogleAd slot="YOUR_FOOTER_AD_SLOT_ID" format="horizontal" style={{ minHeight: 90, width: '100%' }} />
        </div>
      )}
    </div>
  );
}
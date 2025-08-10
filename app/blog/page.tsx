// 'use client';
// import fs from 'fs';
// import path from 'path';
// import BlogCard from '../../components/BlogCard';
// import Nav from "../../components/nav";

// export default function BlogPage() {
//   const dbPath = path.join(process.cwd(), 'data', 'blogs.json');
//   const data = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath, 'utf8')) : [];

//   return (
//     <div className="max-w-3xl mx-auto p-6 space-y-6">
//         <Nav/>
//       <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
//       {data.map((post: any, idx: number) => (
//         <BlogCard key={idx} post={post} />
//       ))}
//     </div>
//   );
// }
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
      <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
      {blogs.map((post, idx) => (
        <BlogCard key={idx} post={post} />
      ))}
    </div>
    </div>
  );
}

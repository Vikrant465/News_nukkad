
import fs from 'fs';
import path from 'path';
import BlogCard from '../../components/BlogCard';
import Nav from "../../components/nav";

export default function BlogPage() {
  const dbPath = path.join(process.cwd(), 'data', 'blogs.json');
  const data = fs.existsSync(dbPath) ? JSON.parse(fs.readFileSync(dbPath, 'utf8')) : [];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
        <Nav/>
      <h1 className="text-3xl font-bold mb-4">All Blogs</h1>
      {data.map((post: any, idx: number) => (
        <BlogCard key={idx} post={post} />
      ))}
    </div>
  );
}

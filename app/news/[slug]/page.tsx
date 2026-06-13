
'use client';
import Nav from "../../../components/nav";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Link from "next/link";
import { BlogPost, addSignedUrls } from "../../lib/addSignedUrls";
import GoogleAd from '../../../components/GoogleAd';

export default function SingleNewsPage() {
  const { slug } = useParams();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [similarPosts, setSimilarPosts] = useState<BlogPost[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axios.get<BlogPost[]>('/api/blogs');
        const found = res.data.find((p) => p.slug === slug);

        if (found) {
          const enrichedPost = await addSignedUrls(found);
          setPost(enrichedPost);

          const enrichedBlogs = await Promise.all(
            res.data.map((b) => addSignedUrls(b))
          );

          const similar = enrichedBlogs
            .filter(
              (b) =>
                b.slug !== slug &&
                b.category?.some((cat) => found.category?.includes(cat))
            )
            .slice(0, 4);

          const latest = enrichedBlogs
            .filter((b) => b.slug !== slug)
            .slice(0, 6);

          setSimilarPosts(similar);
          setLatestPosts(latest);
        }
      } catch (err) {
        console.error(err);
      }
    }

    fetchPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] dark:bg-zinc-950">
        <Nav />
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-red-700 font-bold tracking-widest uppercase text-sm">
            Loading…
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] dark:bg-zinc-950 text-black dark:text-white font-serif pb-20">
      <Nav />

      {/* ── TOP AD ── */}
      <div className="max-w-7xl mx-auto px-4 pt-3">
        <GoogleAd slot="YOUR_ARTICLE_TOP_AD_SLOT_ID" format="horizontal" style={{ minHeight: 90 }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid lg:grid-cols-12 gap-8">

        {/* ══ MAIN ARTICLE ══ */}
        <article className="lg:col-span-8">

          {/* Category Badge + Title */}
          <div className="border-b-2 border-black dark:border-white pb-4 mb-6">
            {post.category?.[0] && (
              <span className="bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5">
                {post.category.join(' · ')}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-black leading-tight mt-3">
              {post.title}
            </h1>
          </div>

          {/* Hero Image */}
          {post.imageUrl && (
            <figure className="mb-6">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full max-h-[500px] object-cover"
              />
              <figcaption className="text-xs text-gray-500 dark:text-gray-400 mt-1 italic">
                {post.title}
              </figcaption>
            </figure>
          )}

          {/* Mid-article Ad */}
          <div className="my-6">
            <GoogleAd slot="YOUR_ARTICLE_MID_AD_SLOT_ID" format="rectangle" style={{ minHeight: 250 }} />
          </div>

          {/* Article Body — split into newspaper-style multi-column for long content */}
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none
            prose-headings:font-black prose-headings:font-serif
            prose-p:leading-relaxed prose-p:font-serif prose-p:text-[15px]
            columns-1 md:columns-2 gap-8">
            <p className="whitespace-pre-line">
              {post.content}
            </p>
          </div>

          {/* Video */}
          {post.videoUrl && (
            <div className="my-8">
              <video controls className="w-full rounded shadow-lg">
                <source src={post.videoUrl} />
              </video>
            </div>
          )}

          {/* Bottom Article Ad */}
          <div className="mt-8">
            <GoogleAd slot="YOUR_ARTICLE_BOTTOM_AD_SLOT_ID" format="horizontal" style={{ minHeight: 90 }} />
          </div>
        </article>

        {/* ══ SIDEBAR ══ */}
        <aside className="lg:col-span-4 space-y-6">

          {/* Sidebar Ad */}
          <GoogleAd slot="YOUR_ARTICLE_SIDEBAR_AD_SLOT_ID" format="vertical" style={{ minHeight: 250, width: '100%' }} />

          {/* Latest News */}
          {latestPosts.length > 0 && (
            <div className="border border-gray-300 dark:border-zinc-700">
              <div className="bg-black text-white px-3 py-2">
                <h2 className="text-xs font-black uppercase tracking-widest">Latest News</h2>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-zinc-700">
                {latestPosts.map((item) => (
                  <li key={item._id} className="px-3 py-2 hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                    <Link href={`/news/${item.slug}`}>
                      <div className="flex gap-2">
                        {item.imageUrl && (
                          <img src={item.imageUrl} alt={item.title} className="w-14 h-14 object-cover flex-shrink-0" />
                        )}
                        <p className="text-xs font-semibold leading-snug hover:text-red-700 dark:hover:text-red-400 transition-colors cursor-pointer">
                          {item.title}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Second sidebar Ad */}
          <GoogleAd slot="YOUR_ARTICLE_SIDEBAR_AD_SLOT_ID_2" format="vertical" style={{ minHeight: 200, width: '100%' }} />
        </aside>
      </div>

      {/* ══ RELATED NEWS ══ */}
      {similarPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 pb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-6 w-1.5 bg-red-700" />
            <h2 className="text-xl font-black uppercase tracking-tight">Related News</h2>
            <div className="flex-1 h-px bg-gray-300 dark:bg-zinc-700" />
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {similarPosts.map((item, i) => (
              <div key={item._id} className={`${i < similarPosts.length - 1 ? 'md:border-r border-gray-200 dark:border-zinc-800 md:pr-3' : ''}`}>
                <Link href={`/news/${item.slug}`}>
                  <div className="group cursor-pointer">
                    {item.imageUrl && (
                      <div className="overflow-hidden mb-2">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    {item.category?.[0] && (
                      <span className="text-red-700 dark:text-red-400 text-[10px] font-bold uppercase tracking-widest">
                        {item.category[0]}
                      </span>
                    )}
                    <p className="text-xs font-bold leading-snug mt-1 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors">
                      {item.title}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
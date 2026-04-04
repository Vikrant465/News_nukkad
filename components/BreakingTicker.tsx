'use client';

import Link from "next/link";

interface Props {
  headlines: {
    _id: string;
    title: string;
    slug: string;
  }[];
}

export default function BreakingTicker({ headlines }: Props) {
  if (!headlines.length) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-red-300 text-white shadow-lg">
      <div className="flex items-center overflow-hidden whitespace-nowrap">

        {/* LABEL */}
        <span className="bg-black px-4 py-2 font-bold shrink-0">
          BREAKING
        </span>

        {/* SCROLLING TEXT */}
        <div className="flex animate-marquee gap-10 px-4">
          {headlines.map((item) => (
            <Link key={item._id} href={`/news/${item.slug}`}>
              <span className="cursor-pointer hover:underline">
                🔴 {item.title}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
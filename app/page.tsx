'use client';
import { Button, Image } from "@heroui/react";
import Head from "next/head";
import Nav from "../components/nav";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>News Nukkad - Stay Updated with the Latest Headlines</title>
        <meta
          name="description"
          content="News Nukkad is your go-to digital corner for real-time news, trending topics, and breaking stories. Stay informed, stay ahead."
        />
        <meta
          name="keywords"
          content="News, Headlines, Breaking News, News Nukkad, India News, Digital News"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
            <Nav />
        
        <section className="flex flex-col-reverse h-screen md:flex-row items-center justify-between gap-10 p-10 bg-gradient-to-r from-blue-100 to-white dark:from-zinc-800 dark:to-zinc-900 transition-all duration-500">
          <div className="flex flex-col items-start max-w-xl">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to{" "}
              <span className="text-blue-600 dark:text-yellow-400">
                News Nukkad
              </span>
            </h1>
            <p className="text-xl mb-6">
              Your digital street corner for breaking news, headlines, and
              stories that matter.
            </p>
            <div className="flex flex-row sm:flex-row gap-4">
              <Button variant="solid" size="lg" className="transition-all duration-300" onPress={() => window.open("https://www.youtube.com/@NewsNukkad-w4z", "_blank")}>
                Explore Latest News
              </Button>
              <Button as={Link} variant="solid" size="lg" className="transition-all duration-300" href="/blog">
                Explore Blogs
              </Button>
            </div>
          </div>
          <Image
            isBlurred
            className="rounded-lg shadow-lg"
            alt="News Nukkad Logo"
            src="/favicon.ico.png"
            width={300}
          />
        </section>

        {/* About Section */}
        <section className="flex items-center justify-center bg-blue-500 dark:bg-zinc-800 text-white dark:text-gray-100 text-xl px-10 text-center transition-all duration-300">
          <div>
            <p>
              Stay connected with the latest news from across the nation.
              <br />
              <span className="text-lg font-semibold">News Nukkad</span> brings
              you stories from every street and every voice that matters.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

'use client';
import { Button, Image } from "@heroui/react";
import Head from "next/head";
import Nav from "../components/nav";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>News Charcha Official - Stay Updated with the Latest Headlines</title>
        <meta
          name="description"
          content="News Charcha Official is your go-to digital corner for real-time news, trending topics, and breaking stories. Stay informed, stay ahead."
        />
        <meta
          name="keywords"
          content="News, Headlines, Breaking News, News Charcha, Charcha, News Charcha Official, India News, Digital News, latest news , Smita Singh"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="flex flex-col min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300">
        <Nav />

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 px-4 sm:px-8 md:px-12 lg:px-20 py-10 md:py-16 bg-gradient-to-r from-blue-100 to-white dark:from-zinc-800 dark:to-zinc-900 transition-all duration-500">
          {/* Left Content */}
          <div className="flex flex-col items-start max-w-2xl text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-snug">
              Welcome to{" "}
              <span className="text-blue-600 dark:text-yellow-400">
                News Charcha Official
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4">
              Welcome to News Charcha Official, your space for fearless and meaningful conversations on news that matters.
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-4">
              From breaking headlines to ground reports, political debates to social issues, we bring you truthful, unbiased, and engaging discussions in a language you understand &mdash; a mix of Hindi and English (Hinglish).
              Here, we don&apos;t just deliver news &mdash; we talk about it, question it, and dig deeper.
            </p>
            <p className="text-base sm:text-lg md:text-xl mb-6">
              Whether it&apos;s the latest policy, a viral trend, or a story that mainstream media missed &mdash; you&apos;ll find it here, discussed openly and honestly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button
                variant="solid"
                size="lg"
                className="w-full sm:w-auto transition-all duration-300"
                onPress={() =>
                  window.open("https://www.youtube.com/@NewsCharchaOfficial", "_blank")
                }
              >
                Explore Youtube Channel
              </Button>
              <Button
                as={Link}
                variant="solid"
                size="lg"
                className="w-full sm:w-auto transition-all duration-300"
                href="/news"
              >
                Explore News
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <Image
            isBlurred
            className="rounded-lg shadow-lg w-40 sm:w-60 md:w-72 lg:w-80"
            alt="News Charcha Official Logo"
            src="/favicon.ico.png"
          />
        </section>

        {/* About Section */}
        <section className="flex items-center justify-center bg-blue-500 dark:bg-zinc-800 text-white dark:text-gray-100 text-center transition-all duration-300">
          <div className="max-w-2xl">
            <p className="text-base sm:text-lg md:text-base leading-relaxed">
              Stay connected with the latest news from across the nation.
              <br />
              <span className="text-lg sm:text-base text-amber-400 font-semibold">
                News Charcha Official
              </span>{" "}
              brings you stories from every street and every voice that matters.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import { Accordion, AccordionItem, Button } from "@heroui/react";
import { useSession } from 'next-auth/react';

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  imageName?: string;
  imageUrl?: string; 
  videoName?: string;
  videoUrl?:string;
  createdAt: string;
};

export default function BlogCard({ post }: { post: BlogPost }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { data: session } = useSession();
  // Accordion opens if hovered or manually toggled
  const shouldOpen = isOpen || isHovering;


  async function handelDelete(id: string, imageName?: string, videoName?: string) {
  // Delete image if exists
  if (imageName) {
    await fetch(`/api/s3/getimages`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: imageName, folder: "upload/image" }),
    });
  }

  // Delete video if exists
  if (videoName) {
    await fetch(`/api/s3/getvideos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: videoName, folder: "upload/video" }),
    });
  }

  // Delete blog entry from DB
  const res = await fetch(`/api/blogs`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });

  if (res.ok) {
    alert("✅ Blog deleted!");
    window.location.reload();
  } else {
    alert("❌ Failed to delete blog");
  }
}
  return (
    <div
      className="transition-all duration-300 w-full max-w-5xl mx-auto" // wider for desktop
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Accordion
        variant="splitted"
        selectedKeys={shouldOpen ? ["1"] : []}
        className="w-full"
      >
        <AccordionItem
          key="1"
          aria-label="Blog Post"
          title={post.title}
          onPress={() => setIsOpen((prev) => !prev)} // click toggle
          className="hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors duration-200"
        >
          <div className="flex flex-col gap-5">
            <div className="p-4 rounded-lg shadow-md bg-white dark:bg-zinc-900">
              <h2 className="text-lg sm:text-xl font-bold">{post.title}</h2>

              <p className="my-2 text-sm sm:text-base leading-relaxed">
                {post.content}
              </p>

              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="my-3 w-full h-auto rounded-lg object-cover"
                />
              )}

              {post.videoUrl && (
                <video
                  controls
                  className="my-3 w-full max-h-96 rounded-lg"
                >
                  <source src={post.videoUrl} />
                </video>
              )}

              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Posted on: {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
            {session?.user?.email === "truescopeyt@gmail.com" || session?.user?.email === "vikrant172singh@gmail.com" ? (
            <Button
              onPress={() => handelDelete(post._id,post.imageName,post.videoName)}
              color="danger"
              variant="ghost"
              className="w-full max-w-24 self-center"
            >
              Delete
            </Button>):undefined}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}


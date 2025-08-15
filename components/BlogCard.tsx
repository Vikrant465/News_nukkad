// import { Accordion, AccordionItem } from "@heroui/react";
// type BlogPost = {
//   title: string;
//   content: string;
//   image?: string;
//   video?: string;
//   createdAt: string;
// };

// export default function BlogCard({ post }: { post: BlogPost }) {
//   return (
//     <Accordion  variant="splitted">  
//       <AccordionItem key="1" aria-label="Accordion 1" className="w-100px" title={post.title}>
//         <div className="border p-4 rounded shadow">
//         <h2 className="text-xl font-bold">{post.title}</h2>
//         <p className="my-2">{post.content}</p>
//         {post.image && <img src={`/uploads/${post.image}`} className="my-2 max-w-full rounded" />}
//         {post.video && (
//           <video controls className="my-2 w-full max-h-96 rounded">
//             <source src={`/uploads/${post.video}`} />
//           </video>
//         )}
//         <p className="text-sm text-gray-500">Posted on: {new Date(post.createdAt).toLocaleString()}</p>
//       </div>
//       </AccordionItem>
//     </Accordion>
//   );
// }
"use client";
import { useState } from "react";
import { Accordion, AccordionItem } from "@heroui/react";

type BlogPost = {
  title: string;
  content: string;
  image?: string;
  video?: string;
  createdAt: string;
};

export default function BlogCard({ post }: { post: BlogPost }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Accordion opens if hovered or manually toggled
  const shouldOpen = isOpen || isHovering;

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
          <div className="p-4 rounded-lg shadow-md bg-white dark:bg-zinc-900">
            <h2 className="text-lg sm:text-xl font-bold">{post.title}</h2>

            <p className="my-2 text-sm sm:text-base leading-relaxed">
              {post.content}
            </p>

            {post.image && (
              <img
                src={`/uploads/${post.image}`}
                alt={post.title}
                className="my-3 w-full h-auto rounded-lg object-cover"
              />
            )}

            {post.video && (
              <video
                controls
                className="my-3 w-full max-h-96 rounded-lg"
              >
                <source src={`/uploads/${post.video}`} />
              </video>
            )}

            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Posted on: {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}


// type BlogPost = {
//   title: string;
//   content: string;
//   image?: string;
//   video?: string;
//   createdAt: string;
// };

// export default function BlogCard({ post }: { post: BlogPost }) {
//   return (
//     <div className="border p-4 rounded shadow">
//       <h2 className="text-xl font-bold">{post.title}</h2>
//       <p className="my-2">{post.content}</p>
//       {post.image && <img src={`/uploads/${post.image}`} className="my-2 max-w-full rounded" />}
//       {post.video && (
//         <video controls className="my-2 w-full max-h-96 rounded">
//           <source src={`/uploads/${post.video}`} />
//         </video>
//       )}
//       <p className="text-sm text-gray-500">Posted on: {new Date(post.createdAt).toLocaleString()}</p>
//     </div>
//   );
// }
type BlogPost = {
  title: string;
  content: string;
  image?: string;
  video?: string;
  createdAt: string;
};

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold">{post.title}</h2>
      <p className="my-2">{post.content}</p>
      {post.image && <img src={`/uploads/${post.image}`} className="my-2 max-w-full rounded" />}
      {post.video && (
        <video controls className="my-2 w-full max-h-96 rounded">
          <source src={`/uploads/${post.video}`} />
        </video>
      )}
      <p className="text-sm text-gray-500">Posted on: {new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
}

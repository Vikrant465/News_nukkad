'use client';
import { useState } from 'react';
import { Button, Input, Textarea, Alert, CheckboxGroup, Checkbox } from '@heroui/react';
import Nav from '../../components/nav';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from "react";
import { s } from 'framer-motion/client';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');   // NEW
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const route = useRouter();
  const [category, setCategory] = React.useState(["all"]);

  const handleSubmit = async () => {
    if (!title || !content || !slug) return alert("Title, Slug and Content are required!");
    setLoading(true);
    try {
      // check the custom slug format if slug has spaces replace it with - . then pass it to the api
      const formattedSlug = slug
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '-')      // Replace special characters with hyphens
        .replace(/\-\-+/g, '-')         // Replace multiple hyphens with single hyphen
        .replace(/^-+/, '')             // Remove leading hyphens
        .replace(/-+$/, '');

      // 1. Save blog meta with custom slug
      const res1 = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug: formattedSlug,   // ✅ custom slug
          content,
          category,
          imageName: image?.name ?? null,
          videoName: video?.name ?? null,
        }),
      });

      // 2. Upload Image to S3 (if exists)
      if (image) {
        const presignRes = await fetch("/api/s3/getimages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: image.name,
            contentType: image.type,
          }),
        });
        const { url } = await presignRes.json();
        const uploadRes = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": image.type },
          body: image,
        });
        if (!uploadRes.ok) throw new Error("Failed to upload image to S3");
      }

      // 3. Upload Video to S3 (if exists)
      if (video) {
        const presignRes = await fetch("/api/s3/getvideos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: video.name,
            contentType: video.type,
          }),
        });
        const { url } = await presignRes.json();
        const uploadRes = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": video.type },
          body: video,
        });
        if (!uploadRes.ok) throw new Error("Failed to upload video to S3");
      }

      // 4. Handle response
      const data = await res1.json();
      if (res1.ok && data.success) {
        alert('Blog uploaded!');
        setTitle('');
        setSlug('');
        setContent('');
        setImage(null);
        setVideo(null);
        route.push('/news');
      } else {
        alert(data.error || 'Upload failed!');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong!');
    }

    setLoading(false);
  };

  return (
    <div>
      {session?.user?.email === "truescopeyt@gmail.com" || session?.user?.email === "vikrant172singh@gmail.com" ? (
        <div className='flex flex-col min-h-screen bg-white text-black dark:bg-zinc-900 dark:text-white transition-colors duration-300'>
          <Nav />
          <div className="w-full max-w-xl mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">Upload Blog</h1>
            <div className='flex flex-col gap-4'>

              <div className="flex flex-row gap-3">
                <CheckboxGroup
                  color="primary"
                  label="Select category"
                  value={category}
                  orientation="horizontal"
                  onValueChange={setCategory}
                >
                  <Checkbox value="all">All</Checkbox>
                  <Checkbox value="business">Business</Checkbox>
                  <Checkbox value="cricket">Cricket</Checkbox>
                  <Checkbox value="entertainment">Entertainment</Checkbox>
                  <Checkbox value="international">Inter-National</Checkbox>
                  <Checkbox value="national">National</Checkbox>
                  <Checkbox value="sports">Sports</Checkbox>
                  <Checkbox value="tech">Tech</Checkbox>
                </CheckboxGroup>
                <p className="text-default-500 text-small border-b-amber-300">Category: {category.join(" ")}</p>
              </div>

              <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input placeholder="Custom URL (slug)" value={slug} onChange={(e) => setSlug(e.target.value)} /> {/* NEW */}
              <Textarea placeholder="Content" variant="bordered" rows={5} value={content} onChange={(e) => setContent(e.target.value)} />
              <Input type="file" label="Upload Image" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
              <Input type="file" label="Upload Video" accept="video/*" onChange={(e) => setVideo(e.target.files?.[0] ?? null)} />

              <Button onPress={handleSubmit} disabled={loading}>
                {loading ? 'Uploading...' : 'Post Blog'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex self-center justify-self-center h-screen items-center">
          <Alert
            color="warning"
            description="You are not authorized to upload content. Contact the admin to get access."
            endContent={
              <Button color="warning" size="sm" variant="flat" onPress={() => window.location.href = '/'}>
                Home
              </Button>
            }
            title="Unauthorized Access"
            variant="faded"
          />
        </div>
      )}
    </div>
  );
}

'use client';
import { useState } from 'react';
import { Button, Input, Textarea, Alert } from '@heroui/react';
import { uploadBlog } from './action';
import Nav from '../../components/nav';
import { useSession } from 'next-auth/react';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);
    if (video) formData.append('video', video);

    const res = await uploadBlog(formData);
    if (res?.success) {
      alert('Blog uploaded!');
      setTitle('');
      setContent('');
      // setImage(null);
      // setVideo(null);  

    } else {
      alert('Upload failed!');
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
            <Input  placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Textarea placeholder="Content" variant="bordered" rows={5} value={content} onChange={(e) => setContent(e.target.value)} />
            {/* <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
            <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files?.[0] ?? null)} /> */}
            <Button onPress={handleSubmit} disabled={loading}>
              {loading ? 'Uploading...' : 'Post Blog'}
            </Button>

            </div>
          </div>
        </div>) : (
        <div className="flex self-center justify-self-center h-screen items-center">
          <Alert
            color="warning"
            description="You are not authrorized to upload content. Contact the admin to get access."
            endContent={
              <Button color="warning" size="sm" variant="flat" onPress={() => window.location.href = '/'}>
                Home
              </Button>
            }
            title="Unothorized Access"
            variant="faded"
          />
        </div>
      )
      }
    </div>
  );
}
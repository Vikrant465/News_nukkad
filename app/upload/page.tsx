'use client';
import { useState } from 'react';
import { Button, Input, Textarea } from '@heroui/react';
import  {uploadBlog}  from './action';

export default function UploadPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
      setImage(null);
      setVideo(null);
    } else {
      alert('Upload failed!');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Upload Blog</h1>
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <Textarea placeholder="Content" rows={5} value={content} onChange={(e) => setContent(e.target.value)} />
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
      <input type="file" accept="video/*" onChange={(e) => setVideo(e.target.files?.[0] ?? null)} />
      <Button onPress={handleSubmit} disabled={loading}>
        {loading ? 'Uploading...' : 'Post Blog'}
      </Button>
    </div>
  );
}

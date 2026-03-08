import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const res = await fetch(`${baseUrl}/blogs/${id}`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const blog = await res.json();

      if (blog && blog.postStatus === 'PUBLISHED') {
        const description = blog.blogDescription
          ? blog.blogDescription.replace(/<[^>]*>/g, '').slice(0, 160)
          : 'Read our latest blog post';

        const image = blog.blogImage?.url || '';

        return {
          title: `${blog.blogTitle} | Florida Yacht Trader`,
          description,
          openGraph: {
            title: blog.blogTitle,
            description,
            images: image ? [image] : [],
            type: 'article',
          },
          twitter: {
            card: 'summary_large_image',
            title: blog.blogTitle,
            description,
            images: image ? [image] : [],
          },
        };
      }
    }
  } catch {}

  return {
    title: 'Blog Post | Florida Yacht Trader',
    description: 'Read our latest blog posts about yachts and boating',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

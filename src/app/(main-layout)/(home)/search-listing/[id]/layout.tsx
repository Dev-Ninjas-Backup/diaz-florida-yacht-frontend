import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;
    const res = await fetch(`${baseUrl}/boats/${id}/details`, {
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      const boat = json.data;

      if (boat) {
        const title = `${boat.buildYear || ''} ${boat.make || ''} ${boat.model || ''}`.trim() || boat.name || 'Boat Details';
        
        const description = boat.description
          ? boat.description.slice(0, 160)
          : `${title} - View details, specifications, and pricing`;

        const image = boat.coverImages?.[0]?.url || boat.galleryImages?.[0]?.url || '';

        return {
          title: `${title} | Florida Yacht Trader`,
          description,
          openGraph: {
            title,
            description,
            images: image ? [image] : [],
            type: 'website',
          },
          twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: image ? [image] : [],
          },
        };
      }
    }
  } catch {}

  return {
    title: 'Boat Details | Florida Yacht Trader',
    description: 'View boat details, specifications, and pricing information',
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

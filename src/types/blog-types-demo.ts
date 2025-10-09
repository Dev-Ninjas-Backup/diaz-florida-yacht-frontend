import { StaticImageData } from 'next/image';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  excerpt: string;
  featuredImage: {
    url: string | StaticImageData;
    alt: string;
    caption: string;
  };
  specifications?: {
    model?: string;
    year?: number;
    length?: string;
    condition?: string;
    type?: string;
  };
  tags: string[];
  featured: boolean;
  views: number;
}

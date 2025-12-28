'use client';

import banner from '@/assets/blogs/banner.jpg';
import BlogCard from '@/components/Blog/BlogCard';
import AdComponent from '@/components/CustomComponents/AdComponent';
import CustomBanner from '@/components/CustomComponents/CustomBanner';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import SmallAdComponent from '@/components/CustomComponents/SmallAdComponent';
import { Loading } from '@/components/ui/loading';
import { NoDataFound } from '@/components/ui/no-data-found';
import { BannerResponse, getBanner } from '@/services/banner/banner';
import { getBlogs } from '@/services/blog/blog';
import { useEffect, useState } from 'react';
import FrontBlog from './_components/FrontBlog/FrontBlog';

interface BlogCardData {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  slug: string;
  readTime: string;
  publishDate: string;
  featuredImage: {
    url: string;
    alt: string;
  };
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogCardData[]>([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [bannerData, setBannerData] = useState<BannerResponse | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load blogs and banner in parallel
        const [blogsData, banner] = await Promise.all([
          getBlogs(),
          getBanner('BLOG', 'FLORIDA'),
        ]);

        // Set banner data
        if (banner) {
          setBannerData(banner);
        }

        // Parse blogs data
        const parsed: BlogCardData[] = blogsData.map((item) => ({
          id: item.id,
          title: item.blogTitle,
          slug: item.sharedLink,
          readTime: `${item.readTime} min read`,
          publishDate: item.createdAt,
          excerpt: item.blogDescription.replace(/<[^>]+>/g, '').slice(0, 140),
          description: item.blogDescription,
          featuredImage: {
            url: item.blogImage?.url ?? '',
            alt: item.blogTitle,
          },
        }));

        setBlogs(parsed);
      } catch (error) {
        console.error('Blog page load error:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      {/* Top Banner */}
      <CustomBanner
        banner={bannerData?.background?.url || banner}
        bannerTitle={bannerData?.bannerTitle}
        subtitle={bannerData?.subtitle}
      />

      <CustomContainer>
        {loading ? (
          <Loading message="Loading blogs..." />
        ) : blogs.length === 0 ? (
          <NoDataFound
            title="No blogs found"
            description="There are no blogs available at the moment."
          />
        ) : (
          <>
            {/* Featured / Front section */}
            <div className="flex flex-col md:flex-row items-stretch gap-10 py-10">
              <div className="w-full md:w-3/4 flex">
                <div className="w-full h-full">
                  <FrontBlog blog={blogs[0]} />
                </div>
              </div>
              <div className="w-full md:w-1/4 flex">
                <div className="w-full h-full">
                  <SmallAdComponent />
                </div>
              </div>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-10">
              {blogs.slice(1, visibleCount + 1).map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {/* Load More */}
            {blogs.length > visibleCount && (
              <div className="flex justify-center my-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="bg-black text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </CustomContainer>

      {/* AdComponent - Always shows as separate section */}
      <AdComponent />
    </div>
  );
};

export default BlogPage;

'use client';

import CustomContainer from '@/components/CustomComponents/CustomContainer';
import { Loading } from '@/components/ui/loading';
import { NoDataFound } from '@/components/ui/no-data-found';
import { getCategories } from '@/services/category/category';
import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard';

type CategoryUI = {
  id: string;
  name: string;
  image: string;
};

const PopularCategories = () => {
  const [categories, setCategories] = useState<CategoryUI[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        const parsed: CategoryUI[] = data.map((item) => ({
          id: item.id,
          name: item.title,
          image: item.image?.url ?? '',
        }));

        setCategories(parsed);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <CustomContainer>
        <Loading message="Loading categories..." />
      </CustomContainer>
    );
  }
  if (categories.length === 0) {
    return (
      <CustomContainer>
        <NoDataFound
          title="No categories found"
          description="There are no popular categories available at the moment."
        />
      </CustomContainer>
    );
  }

  return (
    <CustomContainer>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl text-center font-bold">
        Browse From Popular Categories
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-10 my-10">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </CustomContainer>
  );
};

export default PopularCategories;

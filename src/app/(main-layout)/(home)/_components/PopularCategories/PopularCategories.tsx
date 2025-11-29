import { democategoriesdata } from '@/assets/demo-datas/demodata';
import CustomContainer from '@/components/CustomComponents/CustomContainer';
import CategoryCard from './CategoryCard';

const PopularCategories = () => {
  return (
    <CustomContainer>
      <h2 className="text-xl sm:text-4xl lg:text-5xl text-center font-bold">
        Browse From Popular Categories
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10 my-5 md:my-10">
        {democategoriesdata?.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </CustomContainer>
  );
};

export default PopularCategories;

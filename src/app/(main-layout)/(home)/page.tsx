import Banner from './_components/Banner/Banner';
import DockSideBlog from './_components/DockSideBlog/DockSideBlog';
import FeaturedBrands from './_components/FeaturedBrands/FeaturedBrands';
import PopularCategories from './_components/PopularCategories/PopularCategories';
import PremiumDeals from './_components/PremiumDeals/PremiumDeals';
import SubscriptionPlan from './_components/SubscriptionPlan/SubscriptionPlan';
import WhyUs from './_components/WhyUs/WhyUs';

export const revalidate = 3600;

const HomePage = () => {
  return (
    <div>
      <Banner />
      <PremiumDeals />
      <PopularCategories />
      <WhyUs />
      <FeaturedBrands />
      <SubscriptionPlan />
      <DockSideBlog />
    </div>
  );
};
export default HomePage;

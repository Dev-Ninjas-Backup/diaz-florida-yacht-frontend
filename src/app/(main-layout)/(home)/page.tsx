import React from 'react'
import Banner from './_components/Banner/Banner'
import PremiumDeals from './_components/PremiumDeals/PremiumDeals'
import PopularCategories from './_components/PopularCategories/PopularCategories'
import WhyUs from './_components/WhyUs/WhyUs'
import FeaturedBrands from './_components/FeaturedBrands/FeaturedBrands'
import DockSideBlog from './_components/DockSideBlog/DockSideBlog'
import SubscriptionPlan from './_components/SubscriptionPlan/SubscriptionPlan'

const HomePage = () => {
  return (
    <div >
      <Banner />
      <PremiumDeals />
      <PopularCategories />
      <WhyUs />
      <FeaturedBrands />
      <SubscriptionPlan />
      <DockSideBlog />
    </div>
  )
}
export default HomePage

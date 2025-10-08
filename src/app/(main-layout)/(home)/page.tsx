import React from 'react'
import Banner from './_components/Banner/Banner'
import PremiumDeals from './_components/PremiumDeals/PremiumDeals'
import PopularCategories from './_components/PopularCategories/PopularCategories'
import WhyUs from './_components/WhyUs/WhyUs'

const HomePage = () => {
  return (
    <div className='className="text-primary bg-secondary"'>
      <Banner />
      <PremiumDeals />
      <PopularCategories />
      <WhyUs />
    </div>
  )
}
export default HomePage

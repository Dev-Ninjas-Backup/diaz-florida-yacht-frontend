import { demodata } from '@/assets/demo-datas/demodata';
import ProductCard from '@/components/Product/ProductCard';
import React from 'react';

const AllListing = () => {
    return (
        <div>
            <p className='text-gray-400 font-medium text-sm md:text-lg'>Showing 1 to 12 of 2846 results for “Vining for sale from 2005 to 2008”</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 mt-3'>
                {
                    demodata.map((data, idx) => (<ProductCard isPremium={false} key={idx} product={data} />))
                }
            </div>
        </div>
    );
};

export default AllListing;
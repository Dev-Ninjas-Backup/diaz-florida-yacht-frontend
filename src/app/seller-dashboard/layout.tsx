/**
 * Seller Dashboard Layout
 * Protected layout - requires authentication
 */

'use client';

import CustomContainer from '@/components/CustomComponents/CustomContainer';
import GradientBannerCustom from '@/components/CustomComponents/GradientBannerCustom';
import {
  DefaultLoadingComponent,
  ProtectedRoute,
} from '@/components/auth/ProtectedRoute';
import { ReactNode } from 'react';
import ProfileHeader from './_components/ProfileHeader/ProfileHeader';
import ProfileStates from './_components/ProfileStates/ProfileStates';

const SellerDashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedRoute
      redirectTo="/login"
      loadingComponent={<DefaultLoadingComponent />}
    >
      <div className="my-2 md:my-3 mx-2 md:mx-5 rounded-2xl">
        <GradientBannerCustom>
          <h1 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-center text-white pt-6">
            Welcome To Dashboard
          </h1>
        </GradientBannerCustom>
        <div className="mt-10 md:mt-20">
          <ProfileStates />
          <ProfileHeader />
          <CustomContainer>{children}</CustomContainer>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SellerDashboardLayout;

import { ReactNode } from "react";
import ProfileStates from "./_components/ProfileStates/ProfileStates";
import ProfileHeader from "./_components/ProfileHeader/ProfileHeader";
import Navbar from "@/components/shared/main/Navbar/Navbar";
import CustomContainer from "@/components/CustomComponents/CustomContainer";

const ProvidersLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-20">
        <ProfileStates />
        <ProfileHeader />
        <CustomContainer>{children}</CustomContainer>
      </div>
    </div>
  );
};

export default ProvidersLayout;

import Footer from "@/components/shared/main/Footer/Footer";
import Navbar from "@/components/shared/main/Navbar/Navbar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;

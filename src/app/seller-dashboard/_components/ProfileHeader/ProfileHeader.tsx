"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGripHorizontal } from "react-icons/fa";
import { BriefcaseBusiness, CreditCard, UserRoundPen } from "lucide-react";
import CustomContainer from "@/components/CustomComponents/CustomContainer";

const navItems = [
  {
    label: "My Listing",
    href: "/seller-dashboard/my-listing",
    icon: FaGripHorizontal,
  },
  {
    label: "Leads",
    href: "/seller-dashboard/leads",
    icon: BriefcaseBusiness,
  },
  {
    label: "My Profile",
    href: "/seller-dashboard/my-profile",
    icon: UserRoundPen,
  },
  { label: "Invoices", href: "/seller-dashboard/invoices", icon: CreditCard },
];

const ProfileHeader = () => {
  const pathname = usePathname();

  return (
    <div className=" sticky top-20 z-10">
      <CustomContainer>
        <div className="mt-8 flex justify-between flex-nowrap overflow-x-auto bg-[#F8F9FA] border border-[#D9D9D9]/30 rounded-[10px] p-4 space-x-2 md:space-x-4">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                className={`flex-shrink-0 flex-1 flex items-center justify-center px-4 py-2 space-x-2 text-sm font-medium rounded-lg shadow-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "bg-white text-primary hover:bg-gray-200"
                }`}
              >
                <Icon className="text-lg" />
                <span>{label}</span>
              </Link>
            );
          })}
          <span>Logout</span>
        </div>
      </CustomContainer>
    </div>
  );
};
export default ProfileHeader;

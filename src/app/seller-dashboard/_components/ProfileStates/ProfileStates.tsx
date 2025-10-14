import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaClipboardCheck } from "react-icons/fa";
import profilePhoto from "@/assets/seller-dashboard/profileAvatar.svg";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GoVerified } from "react-icons/go";
import { BriefcaseBusiness } from "lucide-react";
import CustomContainer from "@/components/CustomComponents/CustomContainer";

const ProfileStates = () => {
  return (
    <div className="">
      <CustomContainer>
        {/* Back button */}
        <div className="mt-28">
          <Link
            href="/"
            className="flex items-center bg-[#F8F9FA] border border-[#D9D9D9]/30 rounded-[10px] text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-8 w-fit px-4 py-2"
          >
            <FaArrowLeft className="mr-2" />
            Back to Home Page
          </Link>
        </div>

        {/* Card */}
        <div className="w-full bg-[#F8F9FA] border border-[#D9D9D9]/30 rounded-[10px] p-3 sm:p-5 mt-10 flex lg:flex-row flex-col gap-10 justify-between flex-wrap">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-gray-200 shadow-md">
                <Image
                  src={profilePhoto}
                  alt="Esther Howard"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-grow text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Esther Howard
              </h2>

              {/* Badges */}
              <div className="flex items-center justify-center sm:justify-start mt-1 space-x-3 text-sm text-gray-500 flex-wrap">
                <span className="flex items-center text-green-500 font-medium">
                  <GoVerified className="mr-1" />
                  Verified
                </span>
              </div>
              <p className="text-gray-600">San Francisco, CA</p>
              <p className="text-gray-600 font-semibold mt-1">
                Member since 2023
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center justify-center bg-green-100 rounded-lg p-4 text-center shadow-sm">
              <RiMoneyDollarCircleFill className="text-2xl text-green-600 mb-2" />
              <span className="text-lg font-bold text-primary-txt">
                $10,000.00
              </span>
              <span className="text-sm text-primary-txt">Total Spent</span>
            </div>

            <div className="flex flex-col items-center justify-center bg-blue-100 rounded-lg p-4 text-center shadow-sm">
              <BriefcaseBusiness className="text-2xl text-blue-600 mb-2" />
              <span className="text-lg font-bold text-primary-txt">3</span>
              <span className="text-sm text-primary-txt">Active Job</span>
            </div>

            <div className="flex flex-col items-center justify-center bg-purple-100 rounded-lg p-4 text-center shadow-sm">
              <FaClipboardCheck className="text-2xl text-purple-600 mb-2" />
              <span className="text-lg font-bold text-primary-txt">50</span>
              <span className="text-sm text-primary-txt">Completed</span>
            </div>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default ProfileStates;

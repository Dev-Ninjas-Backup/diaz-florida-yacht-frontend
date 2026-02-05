import type { User } from '@/services/auth';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { IoClose, IoSearch } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';

interface NavItemsMobileProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleLocationClick: () => void;
  getLocationDisplay: () => string;
  user: User | null;
  userLoading: boolean;
  getUserDisplayName: () => string | null;
  getInitials: (name?: string | null) => string;
  handleLogout: () => void;
}

const NavItemsMobile: React.FC<NavItemsMobileProps> = ({
  setIsOpen,
  handleLocationClick,
  getLocationDisplay,
  user,
  userLoading,
  getUserDisplayName,
  getInitials,
  handleLogout,
}) => {
  return (
    <div className="lg:hidden absolute top-0 rounded-xl left-0 w-full z-50 bg-gradient-to-b from-black/50 to-black/90 backdrop-blur-xs border-t border-white/20">
      <IoClose
        className="absolute top-[2%] right-[5%] text-white text-3xl cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
      <div className="container mx-auto py-4 px-4 flex flex-col gap-4 rounded-xl">
        <Link
          href="/"
          className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Boats
        </Link>
        <Link
          href="/blogs"
          className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Blogs
        </Link>
        <Link
          href="/contact"
          className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/search-listing"
          className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <IoSearch /> Search
        </Link>
        <div className="border-t border-white/20 pt-4">
          <div
            className="flex items-center gap-2 px-3 py-2 mb-2 cursor-pointer hover:bg-white/10 rounded-md transition-colors"
            onClick={handleLocationClick}
            title="Click to refresh location"
          >
            <MdMyLocation className="text-white text-lg" />
            <span className="text-white">{getLocationDisplay()}</span>
            <IoIosArrowDown className="text-white" />
          </div>

          
          {!userLoading && user ? (
            <div>
              <div className="flex items-center gap-2 px-3 py-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {getInitials(getUserDisplayName() ?? undefined)}
                </div>
                <div>
                  <p className="font-semibold">{getUserDisplayName()}</p>
                  <p className="text-xs text-gray-300">{user.email}</p>
                </div>
              </div>

              <ul className="flex flex-col">
                <li>
                  <Link
                    href="/seller-dashboard/my-listing"
                    className="block px-3 py-2 "
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 "
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              href={'/login'}
              className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors block"
              onClick={() => setIsOpen(false)}
            >
              My Account
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavItemsMobile;

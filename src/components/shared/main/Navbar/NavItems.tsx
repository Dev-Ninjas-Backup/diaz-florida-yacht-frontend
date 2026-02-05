import type { User } from '@/services/auth';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoClose, IoSearch } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';

interface NavItemsProps {
  logo: StaticImageData | string;
  handleLogout: () => void;
  handleLocationClick: () => void;
  getLocationDisplay: () => string;
  user: User | null;
  userLoading: boolean;
  accountOpen: boolean;
  setAccountOpen: Dispatch<SetStateAction<boolean>>;
  getUserDisplayName: () => string | null;
  getInitials: (name?: string | null) => string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const NavItems: React.FC<NavItemsProps> = ({
  logo,
  handleLogout,
  handleLocationClick,
  getLocationDisplay,
  user,
  userLoading,
  accountOpen,
  setAccountOpen,
  getUserDisplayName,
  getInitials,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div className="container mx-auto flex justify-between items-center pt-2.5">
      <div className="flex-shrink-0">
        <Link href={'/'}>
          <Image
            src={logo}
            alt="Florida Yacht Logo"
            width={80}
            height={80}
            className="w-10 h-10 md:w-14 md:h-14 shrink-0"
          />
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-5">
        <Link href="/" className="px-3 hover:text-gray-300 transition-colors">
          Home
        </Link>
        <Link
          href="/search-listing"
          className="px-3 hover:text-gray-300 transition-colors"
        >
          Boats
        </Link>
        <Link
          href="/blogs"
          className="px-3 hover:text-gray-300 transition-colors"
        >
          Blogs
        </Link>
        <Link
          href="/contact"
          className="px-3 hover:text-gray-300 transition-colors"
        >
          Contact
        </Link>
        <Link
          href="/search-listing"
          className="px-3 hover:text-gray-300 transition-colors flex items-center gap-2"
        >
          <IoSearch /> <span className="hidden xl:inline">Search</span>
        </Link>
      </div>

      <div className="hidden lg:flex items-center gap-5">
        <div
          className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white/10 rounded-md transition-colors"
          onClick={handleLocationClick}
          title="Click to refresh location"
        >
          <MdMyLocation className="text-white text-lg" />
          <span className="text-white hidden md:inline">
            {getLocationDisplay()}
          </span>
          <IoIosArrowDown className="text-white" />
        </div>

        
        <div className="relative">
          {!userLoading && user ? (
            <div className="relative">
              <button
                onClick={() => setAccountOpen((s) => !s)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-white/10 transition-colors"
                aria-haspopup="true"
                aria-expanded={accountOpen}
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                  {getInitials(getUserDisplayName() ?? undefined)}
                </div>
                <span className="hidden md:inline">{getUserDisplayName()}</span>
                <IoIosArrowDown
                  className={`${accountOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded shadow-lg z-50">
                  <div className="p-3 border-b">
                    <p className="font-semibold truncate">
                      {getUserDisplayName()}
                    </p>
                    <p className="text-xs text-gray-600 truncate">
                      {user.email}
                    </p>
                  </div>
                  <ul className="flex flex-col">
                    <li>
                      <Link
                        href="/seller-dashboard/my-listing"
                        className="block px-3 py-2 hover:bg-gray-100"
                        onClick={() => setAccountOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => handleLogout()}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              href={'/login'}
              className="hover:text-gray-300 transition-colors"
            >
              My Account
            </Link>
          )}
        </div>
      </div>

      <button
        className="lg:hidden text-white text-2xl focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <IoClose /> : <GiHamburgerMenu />}
      </button>
    </div>
  );
};

export default NavItems;

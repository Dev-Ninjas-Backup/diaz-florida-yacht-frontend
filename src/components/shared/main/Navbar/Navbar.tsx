'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '@/assets/florida-yacht-logo.png';
import Link from 'next/link';
import { IoSearch } from 'react-icons/io5';
import { MdMyLocation } from 'react-icons/md';
import { IoIosArrowDown } from 'react-icons/io';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const handleChangeBackgroundOnScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleChangeBackgroundOnScroll);
  }, []);
  return (
    <nav
      className={`fixed top-2 md:top-3 inset-x-2 md:inset-x-5  rounded-2xl px-3 py-2 text-white z-50 h-20 md:h-24 ${
        scrolled ? 'bg-black/30 backdrop-blur-xs' : 'bg-transparent'
      }`}
    >
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
          <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-white/10 rounded-md transition-colors">
            <MdMyLocation className="text-white text-lg" />
            <span className="text-white hidden md:inline">Florida - USA</span>
            <IoIosArrowDown className="text-white" />
          </div>
          <Link
            href={'/login'}
            className="hover:text-gray-300 transition-colors"
          >
            My Account
          </Link>
        </div>

        <button
          className="lg:hidden text-white text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <IoClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-gradient-to-b from-black/50 to-black/90 backdrop-blur-xs border-t border-white/20">
          <div className="container mx-auto py-4 px-4 flex flex-col gap-4">
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
              href="/login"
              className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <IoSearch /> Search
            </Link>
            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center gap-2 px-3 py-2 mb-2">
                <MdMyLocation className="text-white text-lg" />
                <span className="text-white">Florida - USA</span>
                <IoIosArrowDown className="text-white" />
              </div>
              <Link
                href={'/login'}
                className="px-3 py-2 hover:bg-white/10 rounded-md transition-colors block"
                onClick={() => setIsOpen(false)}
              >
                My Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

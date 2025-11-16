'use client';
import logo from '@/assets/florida-yacht-logo.png';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from '@/hooks/useLocation';
import { clearAuthCookies } from '@/lib/auth-utils';
import { logoutService } from '@/services/auth';
import { useEffect, useState } from 'react';
import NavItemsMobile from './NavItemsMobile';
import NavItems from './NavItems';

const Navbar = () => {
  const { location, loading, error, getLocation } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleChangeBackgroundOnScroll = () => {
    if (window.scrollY > 0) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  // Auto-get location on component mount
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  const { user, isLoading: userLoading, clearUser } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleChangeBackgroundOnScroll);
    return () =>
      window.removeEventListener('scroll', handleChangeBackgroundOnScroll);
  }, []);

  // Build display name / avatar initials
  const getUserDisplayName = () => {
    if (!user) return null;
    return (
      user.name ||
      (typeof user.email === 'string' ? user.email.split('@')[0] : 'User')
    );
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0].charAt(0) + (parts[1].charAt(0) || '')).toUpperCase();
  };

  const handleLogout = async () => {
    try {
      // Call server-side logout to clear httpOnly cookie
      await logoutService();
    } catch (err) {
      console.error('Logout error:', err);
    }

    // Clear client-side state and cookies
    clearUser();
    clearAuthCookies();
    setAccountOpen(false);
  };
  // Format location display
  const getLocationDisplay = () => {
    if (loading) return 'Getting location...';
    if (error) return 'Location unavailable';
    if (location) return `${location.city}, ${location.state}`;
    return 'Florida - USA'; // fallback
  };

  // Handle location click - refresh location
  const handleLocationClick = () => {
    if (!loading) {
      getLocation();
    }
  };
  return (
    <nav
      className={`fixed top-2 md:top-3 inset-x-2 md:inset-x-5  rounded-2xl px-3 py-2 text-white z-50 h-20 md:h-24 ${
        scrolled ? 'bg-black/30 backdrop-blur-xs' : 'bg-transparent'
      }`}
    >
      <NavItems
        logo={logo}
        handleLocationClick={handleLocationClick}
        getLocationDisplay={getLocationDisplay}
        getInitials={getInitials}
        getUserDisplayName={getUserDisplayName}
        accountOpen={accountOpen}
        setAccountOpen={setAccountOpen}
        handleLogout={handleLogout}
        user={user}
        userLoading={userLoading}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      {isOpen && (
        <NavItemsMobile
          user={user}
          userLoading={userLoading}
          getUserDisplayName={getUserDisplayName}
          getInitials={getInitials}
          handleLogout={handleLogout}
          setIsOpen={setIsOpen}
          handleLocationClick={handleLocationClick}
          getLocationDisplay={getLocationDisplay}
        />
      )}
    </nav>
  );
};

export default Navbar;

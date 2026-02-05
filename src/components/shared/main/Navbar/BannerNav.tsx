'use client';
import logo from '@/assets/florida-yacht-logo.png';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from '@/hooks/useLocation';
import { clearAuthCookies } from '@/lib/auth-utils';
import { logoutService } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import NavItems from './NavItems';
import NavItemsMobile from './NavItemsMobile';

const BannerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { location, loading, error, getLocation } = useLocation();
  const { user, isLoading: userLoading, clearUser } = useAuth();
  const router = useRouter();
  const [accountOpen, setAccountOpen] = useState(false);

  
  useEffect(() => {
    getLocation();
  }, [getLocation]);

  
  const getLocationDisplay = () => {
    if (loading) return 'Getting location...';
    if (error) return 'Location unavailable';
    if (location) return `${location.city}, ${location.state}`;
    return 'Florida - USA'; 
  };

  
  const handleLocationClick = () => {
    if (!loading) {
      getLocation();
    }
  };

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
      await logoutService();
    } catch (err) {
      console.error('Logout error:', err);
    }

    clearUser();
    clearAuthCookies();
    setAccountOpen(false);
    router.push('/');
  };

  return (
    <nav className="inset-x-2 md:inset-x-5  rounded-2xl px-3 py-2 text-white z-50 h-20 md:h-24">
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

export default BannerNav;

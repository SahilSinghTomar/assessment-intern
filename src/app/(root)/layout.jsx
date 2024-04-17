'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const ProfileLayout = ({ children }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const [loading, setLoading] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    async function getPP() {
      try {
        setLoading(true);
        const response = await axios.post('/api/profile', {});
        // console.log(response.data.updatedUser.profilePhoto);
        setProfilePhoto(response.data.updatedUser.profilePhoto);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getPP();
  }, []);

  // const handleLogout = () => {
  //   setShowConfirmation(true);
  // };

  const handleConfirmLogout = async () => {
    try {
      const res = await axios.get('/api/logout');
      console.log(res.data.message);
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <header className="pl-5 flex items-center justify-between py-3 border-b pb-3 mb-10">
        <div className="flex items-center">
          <Link href="/dashboard">
            <h1 className="text-2xl mr-10 font-bold text-pink-600">Dribble</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-5">
            <NavLink href="/inspiration">Inspiration</NavLink>
            <NavLink href="/find-work">Find Work</NavLink>
            <NavLink href="/learn-design">Learn Design</NavLink>
            <NavLink href="/go-pro">Go Pro</NavLink>
            <NavLink href="/hire-designers">Hire Designers</NavLink>
          </nav>
        </div>
        <div className="pr-5 flex items-center space-x-5">
          <input
            className="outline-none border-2 p-2 rounded-full"
            type="text"
            placeholder="Search"
          />
          <div
            className="inline-block relative"
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            {profilePhoto ? (
              <Image
                src={profilePhoto}
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="rounded-full cursor-pointer object-cover w-10 h-10"
                alt="Profile Photo"
                width={40}
                height={40}
              />
            ) : (
              <Image
                src="https://res.cloudinary.com/dag9zpmoy/image/upload/v1713355124/u2wmvxzxslqhrox0ovsa.png"
                alt="Profile Photo"
                onMouseEnter={() => setIsDropdownOpen(true)}
                className="rounded-full cursor-pointer object-cover w-10 h-10"
                width={40}
                height={40}
              />
            )}
            {isDropdownOpen && (
              <div className="absolute right-0 bg-white text-gray-700 pt-1 w-32 rounded-lg shadow-lg overflow-hidden">
                <Link
                  href="/profile"
                  className="hover:bg-pink-600 hover:text-white block px-4 py-2 text-sm"
                >
                  Profile
                </Link>
                <Link
                  href="#"
                  onClick={handleConfirmLogout}
                  className="cursor-pointer hover:bg-pink-600 hover:text-white text-red-500 block px-4 py-2 text-sm"
                >
                  Signout
                </Link>
                {/* {showConfirmation && (
                  <LogoutConfirmation
                    onConfirm={handleConfirmLogout}
                    setShowConfirmation={setShowConfirmation}
                    setIsDropdownOpen={setIsDropdownOpen}
                  />
                )} */}
              </div>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

const NavLink = ({ href, children }) => {
  return (
    <Link className="text-slate-500 hover:text-slate-700" href={href}>
      {children}
    </Link>
  );
};

function LogoutConfirmation({
  onConfirm,
  setShowConfirmation,
  setIsDropdownOpen,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <p className="mb-4">Are you sure you want to sign out?</p>
        <div className="flex justify-end">
          <button
            className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={onConfirm}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => {
              setShowConfirmation(false);
              setIsDropdownOpen(false);
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayout;

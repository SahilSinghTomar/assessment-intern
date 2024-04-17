'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    profilePhoto: '',
    location: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        const response = await axios.post('/api/profile', {});
        setLoading(false);
        setUserData(response.data.updatedUser);
        console.log(response.data.updatedUser);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getProfile();
  }, []);

  return (
    <div className="flex items-center justify-center">
      {loading ? (
        <RotatingLines
          visible={true}
          height="40"
          width="40"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <div className="flex gap-20">
          <Image
            src={userData.profilePhoto}
            alt="Profile Photo"
            className="rounded-full w-[200px] h-[200px] object-cover"
            height={200}
            width={200}
            priority={true}
          />
          <div className="flex flex-col justify-evenly">
            <h1 className="text-2xl font-bold text-pink-600">
              {userData.name}
            </h1>
            <p className="text-lg text-gray-600">{userData.email}</p>
            <p className="text-lg text-gray-600">{userData.location}</p>
            <Link
              href="/edit-profile"
              className="text-center py-2 rounded-md bg-pink-600 hover:bg-pink700 text-white"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

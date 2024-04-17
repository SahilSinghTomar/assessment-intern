'use client';

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { MagnifyingGlass } from 'react-loader-spinner';

const initialState = {
  location: '',
  profilePhoto: '',
};

const EditProfile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(initialState);
  const [imageUrl, setImageUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.post('/api/profile', {});
        setUserData({
          ...userData,
          profilePhoto: response.data.updatedUser.profilePhoto,
          location: response.data.updatedUser.location,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setUserData({ ...userData, profilePhoto: '' });

      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'dribble');
      data.append('cloud_name', 'dag9zpmoy');

      console.log(userData.profilePhoto);

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dag9zpmoy/image/upload',
          data,
          {
            onUploadProgress: (progressEvent) => {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            },
          }
        );
        // console.log(response.data.url);
        setUserData({ ...userData, profilePhoto: response.data.url });
        setProgress(0);
      } catch (error) {
        console.log(error);
        setProgress(0);
      }
    }
  };

  const handleFinish = async (e) => {
    e.preventDefault();
    try {
      // setIsError(false);
      const response = await axios.post('/api/profile', userData);
      console.log('Profile success', response.data);
      router.push('/profile');
    } catch (error) {
      // setIsError(true);
      console.log(error.response.data.error);
      // setErrorMessage(error.response.data.error);
      // toast.error(error.message);
    }
  };

  if (loading) {
    return (
      <div className="grid place-content-center text-center sm:text-left">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="magnifying-glass-loading"
          wrapperStyle={{}}
          wrapperClass="magnifying-glass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }

  return (
    <div className="grid place-content-center text-center sm:text-left">
      <h1 className="text-3xl font-bold mb-3">
        Welcome! Let&apos;s create your profile
      </h1>
      <p className="text-sm text-slate-500 mb-10">
        Let others get to know you better!
      </p>
      <h1 className="font-bold text-lg mb-5">Add an avatar</h1>
      <form onSubmit={(e) => handleFinish(e)}>
        <div className="flex flex-col sm:flex-row items-center gap-10">
          {userData.profilePhoto ? (
            <Image
              className="rounded-full w-[200px] h-[200px] object-cover"
              src={userData.profilePhoto}
              alt="Profile Photo"
              height={200}
              width={200}
            />
          ) : imageUrl ? (
            <Image
              className={`rounded-full w-[200px] h-[200px] object-cover ${
                progress > 0 ? 'opacity-50' : 'opacity-100'
              }`}
              src={imageUrl}
              alt="Uploaded"
              width={200}
              height={200}
            />
          ) : (
            <FontAwesomeIcon
              className="cursor-pointer rounded-full p-20 border-2 border-dashed border-slate-400 hover:border-pink-500 opacity-50"
              icon={faCamera}
            />
          )}

          <div className="flex flex-col text-left">
            <label
              htmlFor="photo"
              className="cursor-pointer border-2 border-slate-400 p-1 rounded-md"
            >
              Choose file
            </label>
            <input
              type="file"
              accept="image/*"
              id="photo"
              className="border-none hidden"
              onChange={handleFileUpload}
            />
            {progress > 0 && <p>Upload Progress: {progress}%</p>}
          </div>
        </div>
        <label
          className="mt-10 mb-5 block text-xl font-bold"
          htmlFor="location"
        >
          Add your location
        </label>
        <input
          type="text"
          id="location"
          className="w-3/4 sm:w-full outline-none font-bold border-b border-slate-300 text-lg pb-1 mb-10"
          placeholder="Enter your location"
          value={userData.location}
          onChange={(e) =>
            setUserData({ ...userData, location: e.target.value })
          }
        />
        <button
          type="submit"
          className={`w-1/3 px-2 py-3 mb-3 bg-pink-600 text-white rounded-lg inline
                   ${progress > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Finish
        </button>
      </form>
    </div>
  );
};

export default EditProfile;

'use client';

import Link from 'next/link';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/navigation';
import { Rings } from 'react-loader-spinner';

const initialState = {
  name: '',
  username: '',
  email: '',
  password: '',
};

const SignUp = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSignup = async () => {
    try {
      setLoading(true);
      setIsError(false);
      const response = await axios.post('/api/signup', userData);
      console.log('SignUp success', response.data);

      toast.success('SignUp success');
      router.push('/login');
    } catch (error) {
      setIsError(true);
      console.log('SignUp failed');
      // console.log(error.response.data.error);
      setErrorMessage(error.response.data.error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#db2777"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  }

  return (
    <div className="w-[80%] p-10 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-5 text-center">
        Sign up to Dribble
      </h1>
      {isError && (
        <div className="bg-red-100 p-3 text-red-600 rounded-lg mb-5">
          {errorMessage}
        </div>
      )}
      <form onSubmit={onSignup}>
        <div className="mb-5">
          <label className="block font-bold mb-1" htmlFor="name">
            Name
          </label>
          <input
            className="w-full md:w-full p-2 rounded-lg bg-slate-100 outline-none"
            type="text"
            id="name"
            name="name"
            value={userData.name}
            placeholder="John"
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-1" htmlFor="username">
            Username
          </label>
          <input
            className="w-full md:w-full p-2 rounded-lg bg-slate-100 outline-none"
            type="text"
            id="username"
            name="username"
            value={userData.username}
            placeholder="john_doe100"
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-1" htmlFor="email">
            Email
          </label>
          <input
            className="w-full md:w-full p-2 rounded-lg bg-slate-100 outline-none"
            type="email"
            id="email"
            name="email"
            value={userData.email}
            placeholder="account@refero.design"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-5">
          <label className="block font-bold mb-1" htmlFor="password">
            Password
          </label>
          <input
            className="w-full md:w-full p-2 rounded-lg bg-slate-100 outline-none"
            type="password"
            id="password"
            name="password"
            value={userData.password}
            placeholder="6+ characters"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            required
          />
        </div>
        <div className="mb-5">
          <input type="checkbox" name="terms-and-conditions" required />
          <p className="text-sm ml-3 inline w-3/4 text-slate-400">
            Creating an account means you&apos;re okay with our Terms of
            Service, Privacy Policy, and our default Notification Settings.
          </p>
        </div>
        <button
          type="submit"
          className="px-3 py-3 mb-3 bg-pink-600 text-white rounded-lg"
        >
          Create Account
        </button>
      </form>
      <div>
        <p className="inline mr-3">Already have account ?</p>
        <Link href="/login" className="text-pink-600 font-bold">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;

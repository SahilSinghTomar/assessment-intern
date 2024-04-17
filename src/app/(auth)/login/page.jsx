'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Rings } from 'react-loader-spinner';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = async () => {
    try {
      setLoading(true);
      setIsError(false);
      const response = await axios.post('/api/login', userData);
      console.log('Login success', response.data);

      toast.success('Login success');
      router.push('/dashboard');
    } catch (error) {
      setIsError(true);
      setUserData(initialState);
      console.log('Login failed');
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
      <h1 className="text-2xl font-bold mb-5 text-center">Login to Dribble</h1>
      {isError && (
        <div className="bg-red-100 p-3 text-red-600 rounded-lg mb-5">
          {errorMessage}
        </div>
      )}
      <form onSubmit={onLogin}>
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
        <button
          type="submit"
          className="px-3 py-3 mb-3 bg-pink-600 text-white rounded-lg"
        >
          Login
        </button>
      </form>
      <div>
        <p className="inline mr-3">Create a account ?</p>
        <Link href="/signup" className="text-pink-600 font-bold">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Login;

import Image from 'next/image';
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2">
        <div className="w-full h-full bg-pink-600"></div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

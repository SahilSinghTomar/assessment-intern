import React from 'react';
import Link from 'next/link';

const ThankYou = () => {
  return (
    <div className="grid place-content-center text-center">
      <h1 className="text-3xl font-bold mb-5">
        Thank you for your registration!
      </h1>
      <p>Your Profile is saved successfully</p>
      <p>
        You can edit your profile by clicking on{' '}
        <Link className="text-pink-600" href="/edit-profile">
          Edit Profile
        </Link>
      </p>
      <p>
        You can access your profile by hovering over profile photo on the top
        right
      </p>
    </div>
  );
};

export default ThankYou;

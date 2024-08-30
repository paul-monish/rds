import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="animate-bounce">
        <img
          src={`assets/404.webp`}
          alt="Network Error"
          className="h-64 w-64 mb-8"
        />
      </div>
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-lg mb-8 text-center">
        Oops! The page you are looking for does not exist.
        <br />
        It might have been moved or deleted.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-white text-blue-500 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;

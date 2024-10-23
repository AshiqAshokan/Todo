import React from 'react';
import { useDispatch } from 'react-redux';
import { clearCredentials } from '../Slice/authSlice';
import { useNavigate } from 'react-router-dom';

const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate('/');
  };


  return (
    <nav className=" bg-blue-600 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Task Manager
          </span>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse mt-2">
         <button type="button" onClick={handleLogout} class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;

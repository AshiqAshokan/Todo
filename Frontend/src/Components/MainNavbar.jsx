import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setCredentials } from '../Slice/authSlice';
import { useLoginMutation,useGoogleSignUpMutation  } from '../Slice/UserApiSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';

const MainNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation();
  const [googleSignIn] = useGoogleSignUpMutation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      const res = await login({ email, password }).unwrap();
      console.log('Login response:', res);
      dispatch(setCredentials({ user: res.user, token: res.accessToken}));
      toast.success("Login successful!");
      navigate('/userpage');
    }
    catch(error){
      toast.error(error?.data?.message || "An error occurred during login");
    }
    finally{
      setIsModalOpen(false);
    }
    
  }
    const handleGoogleLoginSuccess = async (response) => {
    try {
      const res = await googleSignIn({ token: response.credential }).unwrap();
      dispatch(setCredentials({ user: res.user, token: res.accessToken }));
      toast.success('Google login successful!');
      navigate('/userpage');
    } catch (error) {
      toast.error(error?.data?.message || 'Google login failed');
    }
  };
    const handleGoogleLoginFailure = (error) => {
    console.error('Google login error:', error);
    toast.error('Google login failed');
  };

  return (
    <div>
      <nav className="bg-blue-600 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <p className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Task Manager</p>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {/* Modal Toggle Button */}
            <button
            onClick={toggleModal}
            className="mt-5 text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            type="button"
            >
            Login
            </button>

          </div>
        </div>
      </nav>

      {/* Main modal */}
      {isModalOpen && (
        <div
          tabIndex="-1"
          aria-hidden={!isModalOpen}
          className="fixed inset-0 z-50 flex  justify-end overflow-y-auto overflow-x-hidden"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Sign in to our platform
                </h3>
                <button
                  onClick={toggleModal}
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                <form className="space-y-4" action="#">
                  <div>
                  <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter Your Email"
                      required
                    />
                  </div>
                  <div>
                  <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Your Password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  
                  <button
                    type="submit"
                    onClick={handleLogin}
                    className="w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>

                      <GoogleOAuthProvider clientId="1038818047013-kbkd3pndcmp5p0hp79u9hvea1men57ip.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onFailure={handleGoogleFailure}
                  buttonText="Sign in with Google"
                  className="w-full flex items-center justify-center text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2"
                />
              </GoogleOAuthProvider>
              
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainNavbar;

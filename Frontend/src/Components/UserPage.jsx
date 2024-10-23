import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useAddTaskMutation} from '../Slice/TaskApiSlice'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserNavbar from './UserNavbar';
import Taskpage from './Taskpage';
import {  setSearchTerm, setSortOrder} from '../Slice/TaskSlice'
import { useDispatch } from 'react-redux';

const UserPage = () => {
  const {userInfo}=useSelector((state)=>state.auth)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({ title: '', description: '' });
  const [addTask, { isLoading, isError, error }] = useAddTaskMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = async (e)=>{
     e.preventDefault();
     try {
      const res = await addTask(taskData).unwrap();
      toast.success("Task Added  successfully!");
      toggleModal();
      window.location.reload();
     }
     catch (error){
      toast.error(error.message);
     }
  }

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleSort = (e) => {
    dispatch(setSortOrder(e.target.value));
  };

  return (
    <div>
      <UserNavbar />

      <div className='mt-32 p-12 '>
        <button 
          onClick={toggleModal}
          type="button" 
          className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Add Task
        </button>
      </div>

      {isModalOpen && (
        <div
          tabIndex="-1"
          aria-hidden={!isModalOpen}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden backdrop-blur-lg  bg-black bg-opacity-50" 
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            {/* Modal content */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Task
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="Task"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Task
                    </label>
                    <input
                      type="text"
                      name="task"
                      id="task"
                      value={taskData.title}
                      onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="Description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Description
                    </label>
                    <textarea
                      name="description"
                      id="description"
                      value={taskData.description}
                      onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      rows="4"
                      required
                    ></textarea>

                  </div>
                 
                  <button
                    type="submit"
                    className="w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </button>
                  {isError && <p className="text-red-500">Error: {error?.data?.message || 'Failed to add task'}</p>}
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className='p-12'>
        <div className='flex flex-col md:flex-row justify-between p-5 mb-10 w-full bg-gray-400'>
          {/* Search Bar */}
          <div className='flex-1 md:max-w-xs'>
            <form className="flex items-center">   
              <label htmlFor="simple-search" className="sr-only">Search</label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
                <input 
                  type="text" 
                  id="simple-search" 
                  onChange={handleSearch}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 text-black" 
                  placeholder="Search task" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>

          {/* Sort Dropdown */}
          <div className='flex items-center mt-4 md:mt-0'>
            <p className='font-semibold text-xl me-4'>Sort:</p>
            <form className="max-w-sm">
              <select 
                id="sortOrder" 
                onChange={handleSort}
                className="border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option selected>Choose Option</option>
                <option value="Latest">Latest</option>
                <option value="Older">Older</option>
              </select>
            </form>
          </div>
        </div>
      </div>

      <Taskpage />
    </div>
  );
};

export default UserPage;

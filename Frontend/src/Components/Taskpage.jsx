import React, { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useFetchUserTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation,useUpdateTaskStatusMutation  } from '../Slice/TaskApiSlice';


const Taskpage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { searchTerm, sortOrder } = useSelector((state) => state.tasks);
  const userId = userInfo._id;
  const { data: tasks, error, isLoading,refetch } = useFetchUserTasksQuery(userId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleEditClick = (task) => {
    setSelectedTask(task);
    toggleModal();
  };

  const handleDeleteClick = async (id) => {
    await deleteTask(id);
    refetch();
  };

  const handleUpdateTask = async (event) => {
    event.preventDefault();
    const title = event.target.task.value;
    const description = event.target.description.value;

    if (selectedTask) {
      await updateTask({ id: selectedTask._id, data: { title, description } });
      setSelectedTask(null);
      toggleModal();
      refetch();
    }
  };

  const  handleCompleteStatus =async(id)=>{
    await updateTaskStatus({ id, status: 'completed' });
    refetch();
  }
  const filteredTasks = tasks?.filter(task => 
    task.title?.toLowerCase().includes(searchTerm?.toLowerCase().trim())
  );
  
 
  const sortedTasks = filteredTasks?.sort((a, b) => {
    if (sortOrder === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });


  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading tasks.</div>;
  }

  const pendingTasks = sortedTasks?.filter(task => task.status === 'pending');
  const completedTasks = sortedTasks?.filter(task => task.status === 'completed');

  return (
    <div className='flex items-center justify-center p-4'>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-6xl">
        <div className='p-4'>
          <h1 className='text-black font-semibold text-xl mb-5'>Tasks To Be Completed</h1>
          <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            {pendingTasks && pendingTasks.length > 0 ? (
            pendingTasks.map((task) => (
                <div key={task._id}>
                  <div className='w-full bg-blue-700 p-3 mb-5'>
                    <p className='text-white'>Todo</p>
                  </div>
                  <div className="block p-6 bg-blue-300 rounded-lg shadow mb-10">
                    <h1 className='font-semibold text-xl mb-1'>{task.title}</h1>
                    <p>Description: {task.description}</p>
                    <div className='mt-5 mb-5'>
                      <p>
                        Created at: {new Date(task.createdAt).toLocaleDateString('en-GB')} {' '}
                        {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className='flex justify-end space-x-2 flex-wrap'>
                      <button
                        onClick={() => handleEditClick(task)}
                        type="button"
                        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleCompleteStatus(task._id)}
                        type="button"
                        className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Completed
                      </button>
                      <button
                        onClick={() => handleDeleteClick(task._id)}
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Delete
                      </button>
                      
                    </div>
                  </div>
                 
                  {isModalOpen && selectedTask && (
                    <div
                      tabIndex="-1"
                      aria-hidden={!isModalOpen}
                      className="fixed top-0 right-0 bottom-0 left-0 z-50 flex items-center justify-center overflow-y-auto backdrop-blur-lg bg-black bg-opacity-50"
                    >
                      <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              Edit Task
                            </h3>
                            <button
                              onClick={toggleModal}
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                          <div className="p-4">
                            <form className="space-y-4" onSubmit={handleUpdateTask}>
                              <div>
                                <label
                                  htmlFor="task"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Task
                                </label>
                                <input
                                  type="text"
                                  name="task"
                                  id="task"
                                  defaultValue={selectedTask.title}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  required
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="description"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Description
                                </label>
                                <textarea
                                  name="description"
                                  id="description"
                                  defaultValue={selectedTask.description}
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                  rows="4"
                                  required
                                ></textarea>
                              </div>
                              <button
                                type="submit"
                                className="w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No tasks to display.</p> 
            )}
          </div>
        </div>

        <div className='p-4'>
          <h1 className='text-black font-semibold text-xl mb-5'>Tasks Completed</h1>
          <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
            {completedTasks && completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <div key={task._id}>
                  <div className="block p-6 bg-green-300 rounded-lg shadow mb-10">
                    <h1 className='font-semibold text-xl mb-1'>{task.title}</h1>
                    <p>Description: {task.description}</p>
                    <div className='mt-5 mb-5'>
                      <p>
                        Completed at: {new Date(task.updatedAt).toLocaleDateString('en-GB')} {' '}
                        {new Date(task.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className='flex justify-end space-x-2 flex-wrap'>
                      <button
                        onClick={() => handleDeleteClick(task._id)}
                        type="button"
                        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-4 py-2"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No completed tasks to display.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taskpage;

import { apiSlice } from "./apiSlice";
const TASKS_URL='/api/tasks'

export const TaskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addTask: builder.mutation({
          query: (data) => ({
            url: TASKS_URL,
            method: 'POST',
            body: data,
          }),
        }),
        fetchUserTasks:builder.query({
            query:(userId)=>({
              url:`${TASKS_URL}/fetchtask/${userId}`,
              method:'GET',
            }),
           }),
           updateTask: builder.mutation({
            query: ({ id, data }) => ({
              url: `${TASKS_URL}/updatetask/${id}`,
              method: 'PUT',
              body: data,
            }),
          }),
          deleteTask: builder.mutation({
            query: (id) => ({
              url: `${TASKS_URL}/deletetask/${id}`,
              method: 'DELETE',
            }),
          }),
          updateTaskStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `${TASKS_URL}/updatetasksstatus/${id}`,
                method: 'PATCH',
                body: { status },
            }),
        }),
      }),
})

export const { useAddTaskMutation,useFetchUserTasksQuery,useUpdateTaskMutation,useDeleteTaskMutation,useUpdateTaskStatusMutation    } = TaskApiSlice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchTerm: '',
  sortOrder: 'latest', 
};
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      setSearchTerm: (state, action) => {
        state.searchTerm = action.payload;
      },
      setSortOrder: (state, action) => {
        state.sortOrder = action.payload;
      },
    },
  });
  
  export const { setSearchTerm, setSortOrder } = taskSlice.actions;
  
  export default taskSlice.reducer
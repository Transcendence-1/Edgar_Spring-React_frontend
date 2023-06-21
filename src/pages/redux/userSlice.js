import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import UserService from 'src/services/UserService';


export const fetchUsers = UserService.getUsers().then((res)=>{
  return res.data;
});

export const addUser = UserService.createUser(user).then((res)=>{
  return res.data;
})
// createAsyncThunk('users/add', async (user) => {
//   const response = await axios.post(API_BASE_URL, user);
//   return response.data;
// });

export const updateUser = UserService.updateUser(user, user.id).then((res)=>{
  return res.data;
});
// createAsyncThunk('users/update', async (user) => {
//   const response = await axios.put(`${API_BASE_URL}/${user.id}`, user);
//   return response.data;
// });

export const deleteUser = UserService.deleteUser(user.id).then((res)=>{
  return res.data;
});
// createAsyncThunk('users/delete', async (id) => {
//   await axios.delete(`${API_BASE_URL}/${id}`);
//   return id;
// });

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users.items;
export const selectUserById = (state, id) => state.users.items.find((user) => user.id === id);
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;
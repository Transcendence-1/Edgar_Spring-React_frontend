import { createSlice } from '@reduxjs/toolkit';
import UserService from 'src/services/UserService';

const initialState = {
  users: []
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
    addUserSuccess: (state, action) => {
      state.users.push(action.payload);
    },
    updateUserSuccess: (state, action) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUserSuccess: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    }
  },
});

export const {
  getUsersSuccess,
  addUserSuccess,
  updateUserSuccess,
  deleteUserSuccess,
} = usersSlice.actions;

export const getAllUsers = () => async (dispatch) => {  
    UserService.getUsers().then((res)=>{
        dispatch(getUsersSuccess(res.data));
    })
    // const response = await axios.get('/api/users');
    // dispatch(getUsersSuccess(response.data));
};

export const addUser = (user) => async (dispatch) => {
    UserService.createUser(user).then((res)=>{
        dispatch(addUserSuccess(res.data));
    })
    // const response = await axios.post('/api/users', { title, description });
    // dispatch(addUserSuccess(response.data));
};

export const updateUser = (user, id) => async (dispatch) => {
    UserService.updateUser(user, id).then((res)=>{        
        dispatch(updateUserSuccess(res.data));
    })
    // const response = await axios.put(`/api/users/${id}`, { title, description, completed });
    // dispatch(updateUserSuccess(response.data));
};

export const deleteUser = (id) => async (dispatch) => {
    UserService.deleteUser(id).then((res)=>{
        dispatch(deleteUserSuccess(response.data));
    })
    // const response = await axios.delete(`/api/users/${id}`);
    // dispatch(deleteUserSuccess(response.data));
};

export default usersSlice.reducer;
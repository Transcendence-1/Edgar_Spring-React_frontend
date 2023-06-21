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
      const index = state.users.findIndex((user) => user.id === action.payload);
      state.users.splice(index, 1);
      // const filteredUsers = state.users.filter((user) => user.id !== action.payload.id);
      // return {...state, users: filteredUsers};
      // state.users = [...state.users].filter((user) => user.id !== action.payload.id);
      console.log(state.users);
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
};

export const addUser = (user) => async (dispatch) => {
    UserService.createUser(user).then((res)=>{
        dispatch(addUserSuccess(res.data));
    });
};

export const updateUser = (user, id) => async (dispatch) => {
    UserService.updateUser(user, id).then((res)=>{        
        dispatch(updateUserSuccess(res.data));
    });
};

export const deleteUser = (id) => async (dispatch) => {
    UserService.deleteUser(id).then((res)=>{
        dispatch(deleteUserSuccess(res.data));
    });
};

export default usersSlice.reducer;
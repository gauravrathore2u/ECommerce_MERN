import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        firstName: "",
        lastName: "",
        email: "",
        profilePic: "",
        _id: ""
    }
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action)=>{
            state.user.firstName = action.payload.data.firstName;
            state.user.lastName = action.payload.data.lastName;
            state.user.email = action.payload.data.email;
            state.user.profilePic = action.payload.data.profilePic;
            state.user._id = action.payload.data._id;
        },
        
        logoutRedux: (state, action)=>{
            state.user.firstName = "";
            state.user.lastName = "";
            state.user.email = "";
            state.user.profilePic = "";
            state.user._id = "";
        }
    }
});

export const {loginRedux, logoutRedux} = userSlice.actions;
export default userSlice.reducer;
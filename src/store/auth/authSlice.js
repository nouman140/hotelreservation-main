import { createSlice } from "@reduxjs/toolkit";
import {
  SignOutUser,
  forgetPasswordAction,
  loginUser,
  registerUser,
  signInWithGoogle,
} from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    uid: null,
    authLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        alert("User logged in successfully");
        state.authLoading = false;
        state.uid = action.payload.uid;
        state.user = action.payload.user;
        window.location.href = "/";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })
      .addCase(forgetPasswordAction.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(forgetPasswordAction.fulfilled, (state, action) => {
        // alert("User logged in successfully");
        state.authLoading = false;
        window.location.href = "/login";
      })
      .addCase(forgetPasswordAction.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })
      .addCase(SignOutUser.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(SignOutUser.fulfilled, (state, action) => {
        alert("User logged out successfully");
        localStorage.clear();
        state.authLoading = false;
        state.uid = null;
        state.user = null;
        window.location.href = "/";
      })
      .addCase(SignOutUser.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })
      .addCase(signInWithGoogle.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        alert("User logged in using google successfully");
        console.log({ action });
        state.authLoading = false;
        state.uid = action.payload.uid;
        state.user = action.payload.user;
        window.location.href = "/services";
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.authLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        alert("User registered successfully");
        state.authLoading = false;
        window.location.href = "/login";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.authLoading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../config/firebase";
const provider = new firebase.auth.GoogleAuthProvider();

export const loginUser = createAsyncThunk(
  "auth/signin",
  async (payload, { rejectWithValue }) => {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password);
      const uid = userCredential.user.uid;
      const userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get();

      if (userDoc.exists && userDoc.data().role === "customer") {
        return { uid: userDoc.id, user: userDoc.data() };
      } else {
        throw new Error("This user does not exist or is not a customer.");
      }
    } catch (error) {
      console.log(error);
      alert("INVALID_LOGIN_CREDENTIALS");
      return rejectWithValue(error.message || "Error signing in");
    }
  }
);
export const forgetPasswordAction = createAsyncThunk(
  "auth/forget",
  async (payload, { rejectWithValue }) => {
    try {
      await firebase
        .auth()
        .sendPasswordResetEmail(payload.email)
        .then(() => {
          alert("Password reset mail sent to your given email");
        });
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Error signing in");
    }
  }
);
export const signInWithGoogle = createAsyncThunk(
  "auth/googleSignin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      const uid = result?.user?.uid;

      // Fetch user data from Firestore
      const userDoc = await firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get();

      if (userDoc.exists && userDoc.data().role === "customer") {
        return { uid: uid, user: userDoc.data() };
      } else {
        // If user does not exist or is not a customer, create a new user document
        const userData = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          role: "customer",
          createdAt: firebase.firestore.Timestamp.now(),
        };
        await firebase.firestore().collection("users").doc(uid).set(userData);
        return { uid: uid, user: userData };
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "Error signing in with Google");
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      console.log({ payload });
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);
      const uid = userCredential.user.uid;

      // Create user document in Firestore
      await firebase.firestore().collection("users").doc(uid).set({
        name: payload.name,
        email: payload.email,
        role: "customer",
        createdAt: firebase.firestore.Timestamp.now(),
      });

      // Return success message or any other data you need
      return { message: "Sign up successful" };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message || "Error registering user");
    }
  }
);

export const SignOutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      return;
    } catch (error) {
      console.log(error.message);
    }
  }
);

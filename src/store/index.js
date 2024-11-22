import { configureStore } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";
// import storage from "redux-persist/lib/storage";
// import persistReducer from "redux-persist/es/persistReducer";
import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import mainSlice from "./main/mainSlice";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };
const reducer = combineReducers({
  auth: authSlice,
  main: mainSlice,
});
// const persistedReducer = persistReducer(persistConfig, reducer);
const saveToLocalStorage = (state) => {
  const serializedState = CryptoJS.AES.encrypt(
    JSON.stringify(state),
    "my-secret-key"
  ).toString();
  localStorage.setItem("auth", serializedState);
};

const checkLocalStorage = () => {
  const serializedState = localStorage.getItem("auth");
  if (serializedState === null) return undefined;
  return JSON.parse(
    CryptoJS.AES.decrypt(serializedState, "my-secret-key").toString(
      CryptoJS.enc.Utf8
    )
  );
};
const store = configureStore({
  reducer,
  preloadedState: checkLocalStorage(), // set the initial state from local storage
});

store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "./CounterSlice";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

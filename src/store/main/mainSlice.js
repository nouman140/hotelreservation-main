import { createSlice } from "@reduxjs/toolkit";
import {
  clearSearchFilter,
  contactAdminAction,
  getAllAccomodations,
  getMyReservations,
  getSearchLocation,
  getSingleAccomdation,
  getTrendigProperties,
  updateReservation,
} from "./mainThunk";

const initialState = {
  contactLoading: false,
  error: null,
  searchAccomodation: null,
  accomdationsData: [],
  trendingProperties: [],
  myReservations: [],
  accomodationLoading: false,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(contactAdminAction.pending, (state) => {
        state.contactLoading = true;
        state.error = null;
      })
      .addCase(contactAdminAction.fulfilled, (state) => {
        alert(
          "Message has been sent successfully, The admin will contact you at your given email"
        );
        state.contactLoading = false;
      })
      .addCase(contactAdminAction.rejected, (state, action) => {
        state.contactLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllAccomodations.pending, (state) => {
        state.accomodationLoading = true;
        state.error = null;
      })
      .addCase(getAllAccomodations.fulfilled, (state, action) => {
        state.accomodationLoading = false;
        state.accomdationsData = action.payload;
      })
      .addCase(getAllAccomodations.rejected, (state, action) => {
        state.accomodationLoading = false;
        state.error = action.payload;
      })
      .addCase(getSingleAccomdation.pending, (state) => {
        state.accomodationLoading = true;
        state.error = null;
      })
      .addCase(getSingleAccomdation.fulfilled, (state, action) => {
        state.accomodationLoading = false;
        state.singleAccomodation = action.payload;
      })
      .addCase(getSingleAccomdation.rejected, (state, action) => {
        state.accomodationLoading = false;
        state.error = action.payload;
      })
      .addCase(getSearchLocation.pending, (state) => {
        state.accomodationLoading = true;
        state.error = null;
      })
      .addCase(getSearchLocation.fulfilled, (state, action) => {
        state.accomodationLoading = false;
        console.log(action.payload);
        state.searchAccomodation = action.payload;
      })
      .addCase(getSearchLocation.rejected, (state, action) => {
        state.accomodationLoading = false;
        state.error = action.payload;
      })
      .addCase(clearSearchFilter.pending, (state) => {
        state.accomodationLoading = true;
        state.error = null;
      })
      .addCase(clearSearchFilter.fulfilled, (state, action) => {
        state.accomodationLoading = false;
        state.searchAccomodation = null;
      })
      .addCase(clearSearchFilter.rejected, (state, action) => {
        state.accomodationLoading = false;
        state.error = action.payload;
      })
      .addCase(getMyReservations.pending, (state) => {
        state.accomodationLoading = true;
        state.error = null;
      })
      .addCase(getMyReservations.fulfilled, (state, action) => {
        state.accomodationLoading = false;
        state.myReservations = action.payload;
      })
      .addCase(getMyReservations.rejected, (state, action) => {
        state.accomodationLoading = false;
        state.error = action.payload;
      })
      .addCase(getTrendigProperties.pending, (state) => {
        state.accomodationLoading = true;
        state.error = null;
      })
      .addCase(getTrendigProperties.fulfilled, (state, action) => {
        state.accomodationLoading = false;
        state.trendingProperties = action.payload;
      })
      .addCase(getTrendigProperties.rejected, (state, action) => {
        state.accomodationLoading = false;
        state.error = action.payload;
      })
      .addCase(updateReservation.pending, (state) => {
        // state.accomodationLoading = true;
        // state.error = null;
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.accomodationLoading = false;
        alert(`${action.payload.status} Successfull`);
        window.location.reload();
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.accomodationLoading = false;
        state.error = action.payload;
      });
  },
});

export default mainSlice.reducer;

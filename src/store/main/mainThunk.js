import { createAsyncThunk } from "@reduxjs/toolkit";
import firebase from "../../config/firebase";

export const contactAdminAction = createAsyncThunk(
  "main/contact",
  async (payload, { rejectWithValue }) => {
    try {
      firebase
        .firestore()
        .collection("contacts")
        .add({
          ...payload,
          responseStatus: "pending",
          createdAt: firebase.firestore.Timestamp.now(),
        });
      return;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message || "Error sending contact");
    }
  }
);
export const getAllAccomodations = createAsyncThunk(
  "main/accomodations",
  async (_, { rejectWithValue }) => {
    try {
      const accomodationsRef = firebase.firestore().collection("accomodations");

      return new Promise((resolve, reject) => {
        const unsubscribe = accomodationsRef.onSnapshot(
          (querySnapshot) => {
            let accomodations = [];
            querySnapshot.forEach((doc) => {
              accomodations.push({ id: doc.id, ...doc.data() });
            });
            resolve(accomodations);
          },
          (error) => {
            console.error("Error getting accommodations:", error);
            reject(
              rejectWithValue(error.message || "Error getting Accomodations")
            );
          }
        );

        // Return a function to clean up the listener when necessary
        return () => unsubscribe();
      });
    } catch (error) {
      console.error("Error getting accommodations:", error);
      return rejectWithValue(error.message || "Error getting Accomodations");
    }
  }
);
export const getMyReservations = createAsyncThunk(
  "main/reservations",
  async (ID, { rejectWithValue }) => {
    try {
      const reservationRef = firebase
        .firestore()
        .collection("reservation")
        .where("reservedByID", "==", ID)
        .orderBy("createdAt", "desc");

      return new Promise((resolve, reject) => {
        const unsubscribe = reservationRef.onSnapshot(
          async (querySnapshot) => {
            let reservations = [];

            for (let doc of querySnapshot.docs) {
              if (doc.exists) {
                const reservationData = doc.data();
                const accDoc = await firebase
                  .firestore()
                  .collection("accomodations")
                  .doc(reservationData.accomodationID)
                  .get();
                reservations.push({
                  id: doc.id,
                  ...reservationData,
                  accommodation: accDoc.data(),
                });
              }
            }
            resolve(reservations);
          },
          (error) => {
            console.error("Error getting reservations:", error);
            return rejectWithValue(
              error.message || "Error getting reservations"
            );
          }
        );

        // Return a function to clean up the listener when necessary
        return () => unsubscribe();
      });
    } catch (error) {
      console.error("Error getting reservations:", error);
      return rejectWithValue(error.message || "Error getting reservations");
    }
  }
);

export const updateReservation = createAsyncThunk(
  "main/updateReservations",
  async ({ status, ID, payload }, { rejectWithValue }) => {
    try {
      const fieldsToUpdate = { ...payload };
      await firebase
        .firestore()
        .collection("reservation")
        .doc(ID)
        .update(fieldsToUpdate);
      return { status };
    } catch (error) {
      console.error("Error updating reservation:", error);
      return rejectWithValue(error.message || "Error updating reservation");
    }
  }
);

export const getSingleAccomdation = createAsyncThunk(
  "main/singleAcc",
  async (id, { rejectWithValue }) => {
    try {
      const doc = await firebase
        .firestore()
        .collection("accomodations")
        .doc(id)
        .get();
      if (doc.exists) {
        return { id: doc.id, ...doc.data() };
      } else {
        throw new Error("Accommodation not found");
      }
    } catch (error) {
      console.error("Error getting accommodation:", error);
      return rejectWithValue(error.message || "Error getting Accommodation");
    }
  }
);
export const AddReservation = createAsyncThunk(
  "main/reservation",
  async ({ payload, onSuccess }, { rejectWithValue }) => {
    try {
      await firebase
        .firestore()
        .collection("reservation")
        .add({
          ...payload,
          createdAt: firebase.firestore.Timestamp.now(),
        })
        .then(() => onSuccess());
    } catch (error) {
      console.error("Error Adding Reservation:", error);
      return rejectWithValue(error.message || "Error getting Accommodation");
    }
  }
);
export const getSearchLocation = createAsyncThunk(
  "main/search",
  async ({ location, property }, { rejectWithValue }) => {
    try {
      const accomodationsRef = firebase
        .firestore()
        .collection("accomodations")
        .where("city", "==", location)
        .where("type", "==", property);

      return new Promise((resolve, reject) => {
        const unsubscribe = accomodationsRef.onSnapshot(
          (querySnapshot) => {
            let accomodations = [];
            querySnapshot.forEach((doc) => {
              accomodations.push({ id: doc.id, ...doc.data() });
            });
            resolve(accomodations);
          },
          (error) => {
            console.error("Error getting accommodations:", error);
            reject(
              rejectWithValue(error.message || "Error getting Accomodations")
            );
          }
        );

        // Return a function to clean up the listener when necessary
        return () => unsubscribe();
      });
    } catch (error) {
      console.error("Error getting accommodations:", error);
      return rejectWithValue(error.message || "Error getting Accomodations");
    }
  }
);
export const clearSearchFilter = createAsyncThunk(
  "main/clearSearch",
  async (_, { rejectWithValue }) => {
    try {
      return;
      // eslint-disable-next-line no-unreachable
    } catch (error) {
      console.error("Error getting accommodations:", error);
      return rejectWithValue(error.message || "Error getting Accomodations");
    }
  }
);

const mostFrequent = (data) => {
  const idCounts = data.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {});

  const sortedIds = Object.keys(idCounts).sort(
    (a, b) => idCounts[b] - idCounts[a]
  );
  return sortedIds.slice(0, 3);
};

export const getTrendigProperties = createAsyncThunk(
  "main/trending",
  async (_, { rejectWithValue }) => {
    try {
      return new Promise((resolve, reject) => {
        firebase
          .firestore()
          .collection("reservation")
          .onSnapshot(
            async (query) => {
              let IDs = [];
              for (let doc of query.docs) {
                IDs.push(doc.data().accomodationID);
              }
              const sorted = mostFrequent(IDs);
              const trending = [];
              for (let ID of sorted) {
                const foundDoc = await firebase
                  .firestore()
                  .collection("accomodations")
                  .doc(ID)
                  .get();
                if (foundDoc.exists) {
                  trending.push({ id: foundDoc.id, ...foundDoc.data() });
                } else {
                  console.log(`Document with ID ${ID} does not exist.`);
                }
              }
              resolve(trending);
            },
            (error) => {
              console.error("Error in onSnapshot:", error);
              reject(rejectWithValue(error.message || "Error in onSnapshot"));
            }
          );
      });
    } catch (error) {
      console.error("Error getting trending properties:", error);
      return rejectWithValue(
        error.message || "Error getting Trending Properties"
      );
    }
  }
);

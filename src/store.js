import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";
import searchParams from "./searchParamsSlice";
import { petApi } from "./petApiService";

export const store = configureStore({
  reducer: {
    [petApi.reducerPath]: petApi.reducer,
    adoptedPet,
    searchParams,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware),
});

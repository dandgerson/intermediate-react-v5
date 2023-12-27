import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";
import searchParams from "./ searchParamsSlice";

export const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import adoptedPet from "./adoptedPetSlice";

export const store = configureStore({
  reducer: {
    adoptedPet,
  },
});

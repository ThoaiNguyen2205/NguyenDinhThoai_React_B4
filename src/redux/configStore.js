import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./reducers/personReducer";

export const store = configureStore({
  reducer: {
    personReducer: personReducer,
  },
});

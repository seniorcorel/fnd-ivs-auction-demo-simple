"use client"

import { configureStore } from "@reduxjs/toolkit";
import reducers from './reducers'

export const store = configureStore({
  reducer: reducers,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

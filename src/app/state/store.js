"use client"

import { configureStore } from "@reduxjs/toolkit";
import reducers from './reducers'

const middlewares = []

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
  devTools: true,
});
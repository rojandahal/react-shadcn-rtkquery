import {
  configureStore,
  type Middleware,
  type PayloadAction,
} from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import authReducer, { setUser } from "./slices/authSlice";

// Storage middleware
const storageMiddleware: Middleware =
  () => (next) => (action: PayloadAction | unknown) => {
    switch ((action as PayloadAction).type) {
      case setUser.type:
        break;
    }
    return next(action);
  };

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(storageMiddleware)
      .concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

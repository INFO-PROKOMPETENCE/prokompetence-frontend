import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { commonReducer } from "./reducers/common.reducer";
import { userReducer } from "./reducers/user.reducer";

const reducers = combineReducers({
  common: commonReducer,
  user: userReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddelware) => [
    ...getDefaultMiddelware({
      serializableCheck: false,
    }),
  ],
});

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<StorageEvent, any, AnyAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

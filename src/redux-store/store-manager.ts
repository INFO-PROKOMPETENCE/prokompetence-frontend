import {
  AnyAction,
  combineReducers,
  configureStore,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import {
  catalogReducer,
  commonReducer,
  projectReducer,
  teamReducer,
  userReducer,
} from "./reducers";

const reducers = combineReducers({
  common: commonReducer,
  user: userReducer,
  project: projectReducer,
  catalog: catalogReducer,
  team: teamReducer,
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

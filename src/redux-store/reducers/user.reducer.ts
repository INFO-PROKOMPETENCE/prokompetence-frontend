import { createReducer } from "@reduxjs/toolkit";
import { UserStore } from "../../typing/store/user.store";
import { LocalStorageManager, STORAGE_KEYS } from "../../utils";
import {
  setCurrentUserAction,
  setRefreshTokenAction,
  setTokenAction,
} from "../actions/user.action";

const initialState: UserStore = {
  currentUser: null,
  refreshToken: (() => {
    return LocalStorageManager.getFromLocalStorage<string>(
      STORAGE_KEYS.REFRESH_JWT
    );
  })(),
  token: (() => {
    return LocalStorageManager.getFromLocalStorage<string>(STORAGE_KEYS.JWT);
  })(),
};

const setToken = (
  state: UserStore,
  action: ReturnType<typeof setTokenAction>
): UserStore => {
  LocalStorageManager.setToLocalStorage(STORAGE_KEYS.JWT, action.payload);
  return {
    ...state,
    token: action.payload,
  };
};

const setRefreshToken = (
  state: UserStore,
  action: ReturnType<typeof setRefreshTokenAction>
): UserStore => {
  LocalStorageManager.setToLocalStorage(
    STORAGE_KEYS.REFRESH_JWT,
    action.payload
  );
  return {
    ...state,
    refreshToken: action.payload,
  };
};

const setCurrentUser = (
  state: UserStore,
  action: ReturnType<typeof setCurrentUserAction>
): UserStore => {
  return {
    ...state,
    currentUser: action.payload,
  };
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTokenAction, setToken)
    .addCase(setRefreshTokenAction, setRefreshToken)
    .addCase(setCurrentUserAction, setCurrentUser);
});

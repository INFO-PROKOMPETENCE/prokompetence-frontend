import { createReducer } from "@reduxjs/toolkit";
import { UserStore } from "../../typing/store/user.store";
import { LocalStorageManager, STORAGE_KEYS } from "../../utils";
import {
  logoutUserAction,
  setCurrentUserAction,
  setProtfolioAction,
  setRefreshTokenAction,
  setTokenAction,
} from "../actions/user.action";

const initialState: UserStore = {
  currentUser: null,
  refreshToken: (() => {
    return LocalStorageManager.getFromLocalStorage<string>(
      STORAGE_KEYS.REFRESH_JWT,
      false
    );
  })(),
  token: (() => {
    return LocalStorageManager.getFromLocalStorage<string>(
      STORAGE_KEYS.JWT,
      false
    );
  })(),
  portfolio: null,
};

const setToken = (
  state: UserStore,
  action: ReturnType<typeof setTokenAction>
): UserStore => {
  LocalStorageManager.setToLocalStorage(
    STORAGE_KEYS.JWT,
    action.payload,
    false
  );
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
    action.payload,
    false
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

const logoutUser = (
  state: UserStore,
  action: ReturnType<typeof logoutUserAction>
): UserStore => {
  LocalStorageManager.removeFromLocalStorage(STORAGE_KEYS.REFRESH_JWT);
  LocalStorageManager.removeFromLocalStorage(STORAGE_KEYS.JWT);
  LocalStorageManager.removeFromLocalStorage(STORAGE_KEYS.KEY_TECHNOLOGIES);
  LocalStorageManager.removeFromLocalStorage(STORAGE_KEYS.LIFE_SCENARIOS);
  return {
    ...state,
    refreshToken: null,
    currentUser: null,
  };
};

const setProtfolio = (
  state: UserStore,
  action: ReturnType<typeof setProtfolioAction>
): UserStore => {
  return {
    ...state,
    portfolio: action.payload,
  };
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setTokenAction, setToken)
    .addCase(setRefreshTokenAction, setRefreshToken)
    .addCase(setCurrentUserAction, setCurrentUser)
    .addCase(logoutUserAction, logoutUser)
    .addCase(setProtfolioAction, setProtfolio);
});

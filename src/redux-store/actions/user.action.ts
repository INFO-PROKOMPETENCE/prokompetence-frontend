import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserConnector } from "../../api/user-connector";
import {
  CurrentUser,
  LoginUserPayload,
  RefreshTokenPayload,
  RegisterUserPayload,
} from "../../typing/user";
import { setLoadedAction, setLoadingAction } from "./common.action";

export enum USER_ACTIONS {
  SET_TOKEN = "[USER] SET_TOKEN",
  GET_TOKEN = "[USER] GET_TOKEN",
  SET_REFRESH_TOKEN = "[USER] SET_REFRESH_TOKEN",
  GET_REFRESH_TOKEN = "[USER] GET_REFRESH_TOKEN",
  GET_CURRENT_USER = "[USER] GET_CURRENT_USER",
  SET_CURRENT_USER = "[USER] SET_CURRENT_USER",
  REGISTER_USER = "[USER] REGISTER_USER",
  LOGIN_USER = "[USER] LOGIN_USER",
}

export const setTokenAction = createAction<string>(USER_ACTIONS.SET_TOKEN);

export const setRefreshTokenAction = createAction<string>(
  USER_ACTIONS.SET_REFRESH_TOKEN
);

export const setCurrentUserAction = createAction<CurrentUser>(
  USER_ACTIONS.SET_CURRENT_USER
);

export const registerUserAsync = createAsyncThunk(
  USER_ACTIONS.REGISTER_USER,
  async (payload: RegisterUserPayload, { dispatch }) => {
    setLoadingAction(USER_ACTIONS.REGISTER_USER);

    try {
      await UserConnector.getInstance().registerUser(payload);
      const { name, ...data } = payload;
      await dispatch(loginUserAsync(data));
    } catch (e) {
      alert(e);
    }

    setLoadedAction(USER_ACTIONS.REGISTER_USER);
  }
);

export const loginUserAsync = createAsyncThunk(
  USER_ACTIONS.LOGIN_USER,
  async (payload: LoginUserPayload, { dispatch }) => {
    setLoadingAction(USER_ACTIONS.LOGIN_USER);

    try {
      const { data } = await UserConnector.getInstance().loginUser(payload);
      dispatch(setTokenAction(data.accessToken));
      dispatch(setRefreshTokenAction(data.refreshToken));
    } catch (e) {
      alert(e);
    }

    setLoadedAction(USER_ACTIONS.LOGIN_USER);
  }
);

export const getRefreshTokenAsync = createAsyncThunk(
  USER_ACTIONS.GET_REFRESH_TOKEN,
  async (payload: RefreshTokenPayload, { dispatch }) => {
    setLoadingAction(USER_ACTIONS.GET_REFRESH_TOKEN);

    try {
      const { data } = await UserConnector.getInstance().refreshToken(payload);
      dispatch(setTokenAction(data.accessToken));
      dispatch(setRefreshTokenAction(data.refreshToken));
    } catch (e) {
      alert(e);
    }

    setLoadedAction(USER_ACTIONS.GET_REFRESH_TOKEN);
  }
);

export const getCurrentUserAsync = createAsyncThunk(
  USER_ACTIONS.GET_CURRENT_USER,
  async (_, { dispatch }) => {
    setLoadingAction(USER_ACTIONS.GET_CURRENT_USER);

    try {
      const { data } = await UserConnector.getInstance().getCurrentUser();
      dispatch(setCurrentUserAction(data));
    } catch (e) {
      alert(e);
    }

    setLoadedAction(USER_ACTIONS.GET_CURRENT_USER);
  }
);

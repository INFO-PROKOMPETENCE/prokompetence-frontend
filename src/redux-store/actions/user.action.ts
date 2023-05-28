import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UserConnector } from "../../api/user-connector";
import { Store } from "../../typing/store/store";
import {
  CurrentUser,
  LoginUserPayload,
  Portfolio,
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
  LOGOUT_USER = "[USER] LOGOUT_USER",
  GET_PORTFOLIO = "[USER] GET_PORTFOLIO",
  SET_PORTFOLIO = "[USER] SET_PORTFOLIO",
}

export const setTokenAction = createAction<string>(USER_ACTIONS.SET_TOKEN);

export const setRefreshTokenAction = createAction<string>(
  USER_ACTIONS.SET_REFRESH_TOKEN
);

export const setCurrentUserAction = createAction<CurrentUser>(
  USER_ACTIONS.SET_CURRENT_USER
);

export const setProtfolioAction = createAction<Portfolio>(
  USER_ACTIONS.SET_PORTFOLIO
);

export const logoutUserAction = createAction<void>(USER_ACTIONS.LOGOUT_USER);

export const registerUserAsync = createAsyncThunk(
  USER_ACTIONS.REGISTER_USER,
  async (payload: RegisterUserPayload, { dispatch }) => {
    dispatch(setLoadingAction(USER_ACTIONS.REGISTER_USER));

    try {
      await UserConnector.getInstance().registerUser(payload);

      dispatch(setLoadedAction(USER_ACTIONS.REGISTER_USER));
      return true;
    } catch (e) {
      console.log(e);

      dispatch(setLoadedAction(USER_ACTIONS.REGISTER_USER));
      return false;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  USER_ACTIONS.LOGIN_USER,
  async (payload: LoginUserPayload, { dispatch }) => {
    dispatch(setLoadingAction(USER_ACTIONS.LOGIN_USER));

    try {
      const { data } = await UserConnector.getInstance().loginUser(payload);
      dispatch(setTokenAction(data.accessToken));
      dispatch(setRefreshTokenAction(data.refreshToken));

      dispatch(setLoadedAction(USER_ACTIONS.LOGIN_USER));
      return true;
    } catch (e) {
      console.log(e);

      dispatch(setLoadedAction(USER_ACTIONS.LOGIN_USER));
      return false;
    }
  }
);

export const getRefreshTokenAsync = createAsyncThunk(
  USER_ACTIONS.GET_REFRESH_TOKEN,
  async (payload: RefreshTokenPayload, { dispatch }) => {
    dispatch(setLoadingAction(USER_ACTIONS.GET_REFRESH_TOKEN));

    try {
      const { data } = await UserConnector.getInstance().refreshToken(payload);
      dispatch(setTokenAction(data.accessToken));
      dispatch(setRefreshTokenAction(data.refreshToken));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(USER_ACTIONS.GET_REFRESH_TOKEN));
  }
);

export const getCurrentUserAsync = createAsyncThunk(
  USER_ACTIONS.GET_CURRENT_USER,
  async (_, { dispatch }) => {
    dispatch(setLoadingAction(USER_ACTIONS.GET_CURRENT_USER));

    try {
      const { data } = await UserConnector.getInstance().getCurrentUser();
      dispatch(setCurrentUserAction(data));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(USER_ACTIONS.GET_CURRENT_USER));
  }
);

export const getPortfolioAsync = createAsyncThunk(
  USER_ACTIONS.GET_PORTFOLIO,
  async (_, { dispatch, getState }) => {
    dispatch(setLoadingAction(USER_ACTIONS.GET_PORTFOLIO));

    try {
      const userId = (getState() as Store).user.currentUser?.id;
      const { data } = await UserConnector.getInstance().getPortfolio(userId!);
      dispatch(setProtfolioAction(data));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(USER_ACTIONS.GET_PORTFOLIO));
  }
);

import { createAction } from "@reduxjs/toolkit";

export enum COMMON_ACTIONS {
  SET_LOADING = "[COMMON] SET_LOADING",
  SET_LOADED = "[COMMON] SET_LOADED",
}

export const setLoadingAction = createAction<string>(
  COMMON_ACTIONS.SET_LOADING
);

export const setLoadedAction = createAction<string>(COMMON_ACTIONS.SET_LOADED);

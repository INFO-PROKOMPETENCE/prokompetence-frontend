import { createReducer } from "@reduxjs/toolkit";
import { CommonStore } from "../../typing/store/common.store";
import { setLoadedAction, setLoadingAction } from "../actions/common.action";

const initialState: CommonStore = {
  isLoading: {},
};

const setLoading = (
  state: CommonStore,
  action: ReturnType<typeof setLoadingAction>
): CommonStore => {
  return {
    ...state,
    isLoading: {
      ...state.isLoading,
      [action.payload]: true,
    },
  };
};

const setLoaded = (
  state: CommonStore,
  action: ReturnType<typeof setLoadedAction>
): CommonStore => {
  return {
    ...state,
    isLoading: {
      ...state.isLoading,
      [action.payload]: false,
    },
  };
};

export const commonReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setLoadingAction, setLoading)
    .addCase(setLoadedAction, setLoaded);
});

import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../typing/store/store";

const commonSelector = (state: Store) => state.user;

export const currentUserSelector = createSelector([commonSelector], (state) => {
  return state.currentUser;
});

export const refreshTokenSelector = createSelector(
  [commonSelector],
  (state) => {
    return state.refreshToken;
  }
);

export const tokenSelector = createSelector([commonSelector], (state) => {
  return state.token;
});

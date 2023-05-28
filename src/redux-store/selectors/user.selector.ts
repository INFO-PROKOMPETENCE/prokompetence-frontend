import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../typing/store/store";

const userSelector = (state: Store) => state.user;

export const currentUserSelector = createSelector([userSelector], (state) => {
  return state.currentUser;
});

export const refreshTokenSelector = createSelector([userSelector], (state) => {
  return state.refreshToken;
});

export const tokenSelector = createSelector([userSelector], (state) => {
  return state.token;
});

export const portfolioSelector = createSelector([userSelector], (state) => {
  return state.portfolio;
});

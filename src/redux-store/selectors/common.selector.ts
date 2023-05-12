import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../typing/store/store";

const commonSelector = (state: Store) => state.common;

export const isLoadingByKeysSelector = (keys: string[]) =>
  createSelector([commonSelector], (state) => {
    return keys.every((key) => !!state.isLoading[key]);
  });

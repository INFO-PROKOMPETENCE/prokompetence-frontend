import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../typing/store/store";

const teamSelector = (state: Store) => state.team;

export const myTeamSelector = createSelector([teamSelector], (state) => {
  return state.team;
});

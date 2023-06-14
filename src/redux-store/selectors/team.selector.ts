import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../typing/store/store";

const teamSelector = (state: Store) => state.team;

export const myTeamSelector = createSelector([teamSelector], (state) => {
  return state.team;
});

export const invitationsSelector = createSelector([teamSelector], (state) => {
  return state.invitations;
});

export const studentsSelector = createSelector([teamSelector], (state) => {
  return state.students;
});

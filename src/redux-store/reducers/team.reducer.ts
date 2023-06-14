import { createReducer } from "@reduxjs/toolkit";
import { TeamStore } from "../../typing/store/team.store";
import {
  clearTeamDataAction,
  setInvitationsAction,
  setMyTeamAction,
  setStudentsAction,
} from "../actions";

const initialState: TeamStore = {
  team: null,
  invitations: [],
  students: null,
};

const setMyTeam = (
  state: TeamStore,
  action: ReturnType<typeof setMyTeamAction>
): TeamStore => {
  return {
    ...state,
    team: action.payload,
  };
};

const setInvitations = (
  state: TeamStore,
  action: ReturnType<typeof setInvitationsAction>
): TeamStore => {
  return {
    ...state,
    invitations: action.payload,
  };
};

const setStudents = (
  state: TeamStore,
  action: ReturnType<typeof setStudentsAction>
): TeamStore => {
  return {
    ...state,
    students: action.payload,
  };
};

const clearAll = (
  state: TeamStore,
  action: ReturnType<typeof clearTeamDataAction>
): TeamStore => {
  return {
    ...state,
    students: null,
    invitations: [],
    team: null,
  };
};

export const teamReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setMyTeamAction, setMyTeam)
    .addCase(setInvitationsAction, setInvitations)
    .addCase(setStudentsAction, setStudents)
    .addCase(clearTeamDataAction, clearAll);
});

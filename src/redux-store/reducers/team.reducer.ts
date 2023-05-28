import { createReducer } from "@reduxjs/toolkit";
import { TeamStore } from "../../typing/store/team.store";
import { setMyTeamAction } from "../actions";

const initialState: TeamStore = {
  team: null,
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

export const teamReducer = createReducer(initialState, (builder) => {
  builder.addCase(setMyTeamAction, setMyTeam);
});

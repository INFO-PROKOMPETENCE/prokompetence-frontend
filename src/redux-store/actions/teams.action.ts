import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TeamConnector } from "../../api/team-connector";
import { Team } from "../../typing/team";
import { setLoadedAction, setLoadingAction } from "./common.action";

export enum TEAM_ACTIONS {
  SET_MY_TEAM = "[TEAM] SET_MY_TEAM",
  GET_MY_TEAM = "[TEAM] GET_MY_TEAM",
}

export const setMyTeamAction = createAction<Team>(TEAM_ACTIONS.SET_MY_TEAM);

export const getMyTeamAsync = createAsyncThunk(
  TEAM_ACTIONS.GET_MY_TEAM,
  async (_, { dispatch }) => {
    dispatch(setLoadingAction(TEAM_ACTIONS.GET_MY_TEAM));

    try {
      const { data } = await TeamConnector.getInstance().getMyTeam();
      dispatch(setMyTeamAction(data));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(TEAM_ACTIONS.GET_MY_TEAM));
  }
);

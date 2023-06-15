import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { TeamConnector } from "../../api/team-connector";
import { Store } from "../../typing/store/store";
import {
  CreateTeamPayload,
  Invitations,
  Students,
  Team,
} from "../../typing/team";
import { setLoadedAction, setLoadingAction } from "./common.action";

export enum TEAM_ACTIONS {
  SET_MY_TEAM = "[TEAM] SET_MY_TEAM",
  GET_MY_TEAM = "[TEAM] GET_MY_TEAM",
  CREATE_TEAM = "[TEAM] CREATE_TEAM",
  SEND_INVITE_TO_TEAM = "[TEAM] SEND_INVITE_TO_TEAM",
  ACCEPT_INVITE = "[TEAM] ACCEPT_INVITE",
  GET_INVITATIONS = "[TEAM] GET_INVITATIONS",
  SET_INVITATIONS = "[TEAM] SET_INVITATIONS",
  GET_STUDENTS = "[TEAM] GET_STUDENTS",
  SET_STUDENTS = "[TEAM] SET_STUDENTS",
  CLEAR_ALL = "[TEAM] CLEAR_ALL",
}

export const setMyTeamAction = createAction<Team>(TEAM_ACTIONS.SET_MY_TEAM);

export const setInvitationsAction = createAction<Invitations>(
  TEAM_ACTIONS.SET_INVITATIONS
);

export const setStudentsAction = createAction<Students>(
  TEAM_ACTIONS.SET_STUDENTS
);

export const clearTeamDataAction = createAction<void>(TEAM_ACTIONS.CLEAR_ALL);

export const getMyTeamAsync = createAsyncThunk(
  TEAM_ACTIONS.GET_MY_TEAM,
  async (_, { dispatch }) => {
    dispatch(setLoadingAction(TEAM_ACTIONS.GET_MY_TEAM));

    try {
      const { data } = await TeamConnector.getInstance().getMyTeam();
      dispatch(setMyTeamAction(data));

      dispatch(setLoadedAction(TEAM_ACTIONS.GET_MY_TEAM));
      return data;
    } catch (e) {
      console.log(e);

      dispatch(setLoadedAction(TEAM_ACTIONS.GET_MY_TEAM));
      return false;
    }
  }
);

export const createTeamAsync = createAsyncThunk(
  TEAM_ACTIONS.CREATE_TEAM,
  async (payload: CreateTeamPayload, { dispatch }) => {
    dispatch(setLoadingAction(TEAM_ACTIONS.CREATE_TEAM));

    try {
      await TeamConnector.getInstance().createTeam(payload);
      await dispatch(getMyTeamAsync());
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(TEAM_ACTIONS.CREATE_TEAM));
  }
);

export const sendInviteToTeamAsync = createAsyncThunk(
  TEAM_ACTIONS.SEND_INVITE_TO_TEAM,
  async (userId: string, { dispatch, getState }) => {
    dispatch(setLoadingAction(TEAM_ACTIONS.SEND_INVITE_TO_TEAM));

    try {
      const team = (getState() as Store).team.team!;
      await TeamConnector.getInstance().sendInviteToTeam(team.teamId, userId);
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(TEAM_ACTIONS.SEND_INVITE_TO_TEAM));
  }
);

export const acceptInviteToTeamAsync = createAsyncThunk(
  TEAM_ACTIONS.ACCEPT_INVITE,
  async (teamId: string, { dispatch }) => {
    dispatch(setLoadingAction(TEAM_ACTIONS.ACCEPT_INVITE));

    try {
      await TeamConnector.getInstance().acceptInvite(teamId);
      await dispatch(getMyTeamAsync());
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(TEAM_ACTIONS.ACCEPT_INVITE));
  }
);

export const getInvitationsAsync = createAsyncThunk(
  TEAM_ACTIONS.GET_INVITATIONS,
  async (_, { dispatch }) => {
    dispatch(setLoadingAction(TEAM_ACTIONS.GET_INVITATIONS));

    try {
      const { data } = await TeamConnector.getInstance().getInvitations();
      dispatch(setInvitationsAction(data));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(TEAM_ACTIONS.GET_INVITATIONS));
  }
);

export const getStudentsAsync = createAsyncThunk(
  TEAM_ACTIONS.GET_STUDENTS,
  async (_, { dispatch }) => {
    dispatch(setLoadingAction(TEAM_ACTIONS.GET_STUDENTS));

    try {
      const { data } = await TeamConnector.getInstance().getStudents();
      dispatch(setStudentsAction(data));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(TEAM_ACTIONS.GET_STUDENTS));
  }
);

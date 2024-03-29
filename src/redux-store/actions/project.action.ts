import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ProjectConnector } from "../../api/project-connector";
import {
  CreateProjectPayload,
  Project,
  ProjectInformation,
  ProjectList,
} from "../../typing/project";
import { setLoadedAction, setLoadingAction } from "./common.action";

export enum PROJECT_ACTIONS {
  SET_PROJECTS = "[PROJECT] SET_PROJECTS",
  GET_PROJECTS = "[PROJECT] GET_PROJECTS",
  SET_PROJECT = "[PROJECT] SET_PROJECT",
  GET_PROJECT = "[PROJECT] GET_PROJECT",
  SET_PROJECT_INFO = "[PROJECT] SET_PROJECT_INFO",
  GET_PROJECT_INFO = "[PROJECT] GET_PROJECT_INFO",
  CREATE_PROJECT = "[PROJECT] CREATE_PROJECT",
  CLEAR_PROJECT_DATA = "[PROJECT] CLEAR_PROJECT_DATA",
  ENROLL_TO_PROJECT = "[PROJECT] ENROLL_TO_PROJECT",
}

export const setProjectsAction = createAction<ProjectList>(
  PROJECT_ACTIONS.SET_PROJECTS
);

export const setProjectAction = createAction<Project>(
  PROJECT_ACTIONS.SET_PROJECT
);

export const setProjectInfoAction = createAction<ProjectInformation>(
  PROJECT_ACTIONS.SET_PROJECT_INFO
);

export const clearProjectDataAction = createAction<void>(
  PROJECT_ACTIONS.CLEAR_PROJECT_DATA
);

export const getProjectsAsync = createAsyncThunk(
  PROJECT_ACTIONS.GET_PROJECTS,
  async (_, { dispatch }) => {
    dispatch(setLoadingAction(PROJECT_ACTIONS.GET_PROJECTS));

    try {
      const { data } = await ProjectConnector.getInstance().getProjects();
      dispatch(setProjectsAction(data));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(PROJECT_ACTIONS.GET_PROJECTS));
  }
);

export const getProjectAsync = createAsyncThunk(
  PROJECT_ACTIONS.GET_PROJECT,
  async (projectId: string, { dispatch }) => {
    dispatch(setLoadingAction(PROJECT_ACTIONS.GET_PROJECT));

    try {
      const { data } = await ProjectConnector.getInstance().getProject(
        projectId
      );
      dispatch(setProjectAction(data));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(PROJECT_ACTIONS.GET_PROJECT));
  }
);

export const getProjectInfoAsync = createAsyncThunk(
  PROJECT_ACTIONS.GET_PROJECT_INFO,
  async (projectId: string, { dispatch }) => {
    dispatch(setLoadingAction(PROJECT_ACTIONS.GET_PROJECT_INFO));

    try {
      const { data } = await ProjectConnector.getInstance().getProjectInfo(
        projectId
      );
      dispatch(setProjectInfoAction(data));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(PROJECT_ACTIONS.GET_PROJECT_INFO));
  }
);

export const createProjectAsync = createAsyncThunk(
  PROJECT_ACTIONS.CREATE_PROJECT,
  async (payload: CreateProjectPayload, { dispatch }) => {
    dispatch(setLoadingAction(PROJECT_ACTIONS.CREATE_PROJECT));

    try {
      await ProjectConnector.getInstance().createProject(payload);
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(PROJECT_ACTIONS.CREATE_PROJECT));
  }
);

export const enrollToProjectAsync = createAsyncThunk(
  PROJECT_ACTIONS.ENROLL_TO_PROJECT,
  async (projectId: string, { dispatch }) => {
    dispatch(setLoadingAction(PROJECT_ACTIONS.ENROLL_TO_PROJECT));

    try {
      await ProjectConnector.getInstance().enrollToProject(projectId);
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(PROJECT_ACTIONS.ENROLL_TO_PROJECT));
  }
);

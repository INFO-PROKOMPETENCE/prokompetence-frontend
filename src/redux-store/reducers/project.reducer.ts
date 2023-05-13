import { createReducer } from "@reduxjs/toolkit";
import { ProjectStore } from "../../typing/store/project.store";
import {
  setProjectsAction,
  setProjectAction,
  setProjectInfoAction,
} from "../actions";

const initialState: ProjectStore = {
  projectList: {
    items: [],
    totalCount: 0,
  },
  currentProject: null,
  currentProjectInfo: null,
};

const setProjects = (
  state: ProjectStore,
  action: ReturnType<typeof setProjectsAction>
): ProjectStore => {
  return {
    ...state,
    projectList: action.payload,
  };
};

const setProject = (
  state: ProjectStore,
  action: ReturnType<typeof setProjectAction>
): ProjectStore => {
  return {
    ...state,
    currentProject: action.payload,
  };
};

const setProjectInfo = (
  state: ProjectStore,
  action: ReturnType<typeof setProjectInfoAction>
): ProjectStore => {
  return {
    ...state,
    currentProjectInfo: action.payload,
  };
};

export const projectReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setProjectsAction, setProjects)
    .addCase(setProjectAction, setProject)
    .addCase(setProjectInfoAction, setProjectInfo);
});

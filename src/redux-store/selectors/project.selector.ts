import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../typing/store/store";

const projectSelector = (state: Store) => state.project;

export const projectsSelector = createSelector([projectSelector], (state) => {
  return state.projectList;
});

export const currentProjectSelector = createSelector(
  [projectSelector],
  (state) => {
    return state.currentProject;
  }
);

export const currentProjectInfoSelector = createSelector(
  [projectSelector],
  (state) => {
    return state.currentProjectInfo;
  }
);

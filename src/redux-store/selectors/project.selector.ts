import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../typing/store/store";

const commonSelector = (state: Store) => state.projects;

export const projectsSelector = createSelector([commonSelector], (state) => {
  return state.projectList;
});

export const currentProjectSelector = createSelector(
  [commonSelector],
  (state) => {
    return state.currentProject;
  }
);

export const currentProjectInfoSelector = createSelector(
  [commonSelector],
  (state) => {
    return state.currentProjectInfo;
  }
);

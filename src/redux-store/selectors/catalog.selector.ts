import { createSelector } from "@reduxjs/toolkit";
import { Store } from "../../typing/store/store";

const catalogSelector = (state: Store) => state.catalog;

export const keyTechnologiesSelector = createSelector(
  [catalogSelector],
  (state) => {
    return state.keyTechnoloies;
  }
);

export const lifeScenariosSelector = createSelector(
  [catalogSelector],
  (state) => {
    return state.lifeScenarios;
  }
);

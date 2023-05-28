import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { CatalogConnector } from "../../api/catalog-connector";
import { KeyTechnologies, LifeScenarios } from "../../typing/catalog";
import { setLoadedAction, setLoadingAction } from "./common.action";

export enum CATALOG_ACTIONS {
  SET_KEY_TECHNOLOGIES = "[CATALOG] SET_KEY_TECHNOLOGIES",
  GET_KEY_TECHNOLOGIES = "[CATALOG] GET_KEY_TECHNOLOGIES",
  SET_LIFE_SCENARIOS = "[CATALOG] SET_LIFE_SCENARIOS",
  GET_LIFE_SCENARIOS = "[CATALOG] GET_LIFE_SCENARIOS",
}

export const setKeyTechnologiesAction = createAction<KeyTechnologies>(
  CATALOG_ACTIONS.SET_KEY_TECHNOLOGIES
);

export const setLifeScenariosAction = createAction<LifeScenarios>(
  CATALOG_ACTIONS.SET_LIFE_SCENARIOS
);

export const getKeyTechnologiesAsync = createAsyncThunk(
  CATALOG_ACTIONS.GET_KEY_TECHNOLOGIES,
  async (_, { dispatch }) => {
    dispatch(setLoadingAction(CATALOG_ACTIONS.GET_KEY_TECHNOLOGIES));

    try {
      const { data } =
        await CatalogConnector.getInstance().getKeyTechnologies();
      dispatch(setKeyTechnologiesAction(data));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(CATALOG_ACTIONS.GET_KEY_TECHNOLOGIES));
  }
);
export const getLifeScenariosAsync = createAsyncThunk(
  CATALOG_ACTIONS.GET_LIFE_SCENARIOS,
  async (_, { dispatch }) => {
    dispatch(setLoadingAction(CATALOG_ACTIONS.GET_LIFE_SCENARIOS));

    try {
      const { data } = await CatalogConnector.getInstance().getLifeScenarios();
      dispatch(setLifeScenariosAction(data));
    } catch (e) {
      console.log(e);
    }

    dispatch(setLoadedAction(CATALOG_ACTIONS.GET_LIFE_SCENARIOS));
  }
);

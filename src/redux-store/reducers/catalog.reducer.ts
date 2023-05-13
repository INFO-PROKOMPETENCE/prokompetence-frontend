import { createReducer } from "@reduxjs/toolkit";
import { KeyTechnologies, LifeScenarios } from "../../typing/catalog";
import { CatalogStore } from "../../typing/store/catalog.store";
import { LocalStorageManager, STORAGE_KEYS } from "../../utils";
import { setKeyTechnologiesAction, setLifeScenariosAction } from "../actions";

const initialState: CatalogStore = {
  keyTechnoloies: (() => {
    const data = LocalStorageManager.getFromLocalStorage<KeyTechnologies>(
      STORAGE_KEYS.KEY_TECHNOLOGIES
    );
    return data;
  })(),
  lifeScenarios: (() => {
    const data = LocalStorageManager.getFromLocalStorage<LifeScenarios>(
      STORAGE_KEYS.LIFE_SCENARIOS
    );
    return data;
  })(),
};

const setKeyTechnologies = (
  state: CatalogStore,
  action: ReturnType<typeof setKeyTechnologiesAction>
): CatalogStore => {
  LocalStorageManager.removeFromLocalStorage(STORAGE_KEYS.KEY_TECHNOLOGIES);
  LocalStorageManager.setToLocalStorage(
    STORAGE_KEYS.KEY_TECHNOLOGIES,
    action.payload
  );

  return {
    ...state,
    keyTechnoloies: action.payload,
  };
};

const setLifeScenarios = (
  state: CatalogStore,
  action: ReturnType<typeof setLifeScenariosAction>
): CatalogStore => {
  console.log(action.payload);
  LocalStorageManager.removeFromLocalStorage(STORAGE_KEYS.LIFE_SCENARIOS);
  LocalStorageManager.setToLocalStorage(
    STORAGE_KEYS.LIFE_SCENARIOS,
    action.payload
  );

  return {
    ...state,
    lifeScenarios: action.payload,
  };
};

export const catalogReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setKeyTechnologiesAction, setKeyTechnologies)
    .addCase(setLifeScenariosAction, setLifeScenarios);
});

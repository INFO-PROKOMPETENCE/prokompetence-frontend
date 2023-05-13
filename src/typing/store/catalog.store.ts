import { KeyTechnologies, LifeScenarios } from "../catalog";

export interface CatalogStore {
  keyTechnoloies: KeyTechnologies | null;
  lifeScenarios: LifeScenarios | null;
}

import { ProjectStore } from "./project.store";
import { CommonStore } from "./common.store";

export interface Store {
  projects: ProjectStore;
  common: CommonStore;
}

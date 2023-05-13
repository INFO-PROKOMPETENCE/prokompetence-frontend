import { ProjectStore } from "./project.store";
import { CommonStore } from "./common.store";
import { UserStore } from "./user.store";

export interface Store {
  projects: ProjectStore;
  common: CommonStore;
  user: UserStore;
}

import { ProjectStore } from "./project.store";
import { CommonStore } from "./common.store";
import { UserStore } from "./user.store";
import { CatalogStore } from "./catalog.store";

export interface Store {
  project: ProjectStore;
  common: CommonStore;
  user: UserStore;
  catalog: CatalogStore;
}

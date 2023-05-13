import { Project, ProjectInformation, ProjectList } from "../project";

export interface ProjectStore {
  projectList: ProjectList;
  currentProject: Project | null;
  currentProjectInfo: ProjectInformation | null;
}

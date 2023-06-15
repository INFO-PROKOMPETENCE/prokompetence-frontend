import { ConnectorFlow } from "../typing/connector";
import { PrimaryConnector } from "./primary-controller";
import { axios } from "../utils/axios";
import { ConnectorAsInstance } from "../utils";
import {
  CreateProjectPayload,
  Project,
  ProjectInformation,
  ProjectList,
} from "../typing/project";

export class ProjectConnector extends PrimaryConnector<ConnectorFlow.PROJECTS> {
  @ConnectorAsInstance()
  public static getInstance: () => ProjectConnector;

  constructor() {
    super(ConnectorFlow.PROJECTS);
  }

  public getProjects = () => {
    return axios.get<ProjectList>(this.urls.GET_PROJECTS);
  };

  public getProject = (projectId: string) => {
    return axios.get<Project>(this.urls.GET_HEADER_PROJECT(projectId));
  };

  public getProjectInfo = (projectId: string) => {
    return axios.get<ProjectInformation>(this.urls.GET_INFO_PROJECT(projectId));
  };

  public createProject = (payload: CreateProjectPayload) => {
    return axios.post<void>(this.urls.ADD_PROJECT, payload);
  };

  public enrollToProject = (projectId: string) => {
    return axios.post<void>(this.urls.ENROLL_TO_PROJECT(projectId));
  };
}

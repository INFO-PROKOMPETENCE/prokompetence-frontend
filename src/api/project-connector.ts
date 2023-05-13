import { ConnectorFlow } from "../typing/connector";
import { ConnectorAsInstance } from "../utils/connector-as-static";
import { PrimaryConnector } from "./primary-controller";
import { axios } from "../utils/axios";

export class ProjectConnector extends PrimaryConnector<ConnectorFlow.PROJECTS> {
  @ConnectorAsInstance()
  public static getInstance: () => ProjectConnector;

  constructor() {
    super(ConnectorFlow.PROJECTS);
  }

  public getDefault = () => {
    return axios.get<any>(this.urls.ADD_PROJECT);
  };
}

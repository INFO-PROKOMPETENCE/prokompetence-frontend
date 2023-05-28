import { ConnectorFlow } from "../typing/connector";
import { Team } from "../typing/team";
import { axios, ConnectorAsInstance } from "../utils";
import { PrimaryConnector } from "./primary-controller";

export class TeamConnector extends PrimaryConnector<ConnectorFlow.TEAMS> {
  @ConnectorAsInstance()
  public static getInstance: () => TeamConnector;

  constructor() {
    super(ConnectorFlow.TEAMS);
  }

  public getMyTeam = () => {
    return axios.get<Team>(this.urls.GET_MY_TEAM);
  };
}

import { ConnectorFlow } from "../typing/connector";
import { CreateTeamPayload, Invitations, Students, Team } from "../typing/team";
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

  public createTeam = (payload: CreateTeamPayload) => {
    return axios.post<void>(this.urls.CREATE_TEAM, payload);
  };

  public sendInviteToTeam = (teamId: string, userId: string) => {
    return axios.post<void>(this.urls.SEND_INVITE_IN_TEM(teamId), { userId });
  };

  public getInvitations = () => {
    return axios.get<Invitations>(this.urls.GET_INVITES_TO_TEAMS);
  };

  public acceptInvite = (teamId: string) => {
    return axios.post<void>(this.urls.ACCEPT_INVITE(teamId));
  };

  public getStudents = () => {
    return axios.get<Students>(this.urls.GET_STUDENTS);
  };
}

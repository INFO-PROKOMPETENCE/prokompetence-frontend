import { ConnectorFlow } from "../typing/connector";
import { ConnectorAsInstance } from "../utils/connector-as-static";
import { PrimaryConnector } from "./primary-controller";
import {
  CurrentUser,
  LoginUserPayload,
  LoginUserResponse,
  Portfolio,
  RefreshTokenPayload,
  RegisterUserPayload,
} from "../typing/user";
import { axios } from "../utils";

export class UserConnector extends PrimaryConnector<ConnectorFlow.USER> {
  @ConnectorAsInstance()
  public static getInstance: () => UserConnector;

  constructor() {
    super(ConnectorFlow.USER);
  }

  public registerUser = (payload: RegisterUserPayload) => {
    return axios.post<void>(this.urls.REGISTER_USER, payload);
  };

  public loginUser = (payload: LoginUserPayload) => {
    return axios.post<LoginUserResponse>(this.urls.LOGIN_USER, payload);
  };

  public refreshToken = (payload: RefreshTokenPayload) => {
    return axios.post<LoginUserResponse>(this.urls.REFRESH_TOKEN, payload);
  };

  public getCurrentUser = () => {
    return axios.get<CurrentUser>(this.urls.GET_CURRENT_USER);
  };

  public getPortfolio = (userId: string) => {
    return axios.get<Portfolio>(this.urls.GET_PORTFOLIO(userId));
  };
}

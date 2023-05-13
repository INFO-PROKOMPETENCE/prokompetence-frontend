import { ConnectorFlow } from "../typing/connector";
import { PrimaryConnector } from "./primary-controller";
import { axios } from "../utils/axios";
import { ConnectorAsInstance } from "../utils";
import { KeyTechnologies, LifeScenarios } from "../typing/catalog";

export class CatalogConnector extends PrimaryConnector<ConnectorFlow.CATALOG> {
  @ConnectorAsInstance()
  public static getInstance: () => CatalogConnector;

  constructor() {
    super(ConnectorFlow.CATALOG);
  }

  public getKeyTechnologies = () => {
    return axios.get<KeyTechnologies>(this.urls.GET_KEY_TECHNOLOGIES);
  };

  public getLifeScenarios = () => {
    return axios.get<LifeScenarios>(this.urls.GET_LIFE_SCENARIOS);
  };
}

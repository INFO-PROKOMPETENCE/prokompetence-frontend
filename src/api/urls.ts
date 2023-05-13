import { ConnectorFlow } from "../typing/connector";

export const URLS = {
  [ConnectorFlow.PROJECTS]: {
    GET_PROJECTS: "/api/projects",
    ADD_PROJECT: "/api/projects",
    GET_HEADER_PROJECT: (projectId: string) =>
      `/api/projects/${projectId}/header`,
    GET_INFO_PROJECT: (projectId: string) =>
      `/api/projects/${projectId}/information`,
  },
  [ConnectorFlow.USER]: {
    REGISTER_USER: "/api/users/register",
    LOGIN_USER: "/api/users/login",
    REFRESH_TOKEN: "/api/users/refresh-token",
    GET_CURRENT_USER: "/api/users/current",
  },
  [ConnectorFlow.ORGANIZATION]: {
    GET_MY_ORGANOZATION: "api/organizations/my",
    CREATE_ORGANOZATION: "api/organizations",
  },
  [ConnectorFlow.CATALOG]: {
    GET_KEY_TECHNOLOGIES: "api/catalogs/key-technologies",
    GET_LIFE_SCENARIOS: "api/catalogs/life-scenarios",
    GET_TEAM_ROLES: "api/catalogs/team-roles",
  },
};

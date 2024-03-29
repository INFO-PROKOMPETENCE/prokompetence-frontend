import { ConnectorFlow } from "../typing/connector";

export const URLS = {
  [ConnectorFlow.PROJECTS]: {
    GET_PROJECTS: "/api/projects",
    ADD_PROJECT: "/api/projects",
    GET_HEADER_PROJECT: (projectId: string) =>
      `/api/projects/${projectId}/header`,
    GET_INFO_PROJECT: (projectId: string) =>
      `/api/projects/${projectId}/information`,
    ENROLL_TO_PROJECT: (projectId: string) =>
      `/api/projects/${projectId}/enroll`,
  },
  [ConnectorFlow.USER]: {
    REGISTER_USER: "/api/users/register",
    LOGIN_USER: "/api/users/login",
    REFRESH_TOKEN: "/api/users/refresh-token",
    GET_CURRENT_USER: "/api/users/current",
    GET_PORTFOLIO: (userId: string) =>
      `/api/portfolio/users/${userId}/projects`,
  },
  [ConnectorFlow.ORGANIZATION]: {
    GET_MY_ORGANOZATION: "/api/organizations/my",
    CREATE_ORGANOZATION: "/api/organizations",
  },
  [ConnectorFlow.CATALOG]: {
    GET_KEY_TECHNOLOGIES: "/api/catalogs/key-technologies",
    GET_LIFE_SCENARIOS: "/api/catalogs/life-scenarios",
    GET_TEAM_ROLES: "/api/catalogs/team-roles",
  },
  [ConnectorFlow.TEAMS]: {
    GET_MY_TEAM: "/api/teams/my",
    GET_STUDENTS: "/api/students",
    CREATE_TEAM: "/api/teams",
    SEND_INVITE_IN_TEM: (teamId: string) => `/api/teams/${teamId}/invite`,
    GET_INVITES_TO_TEAMS: "/api/teams/invitations",
    ACCEPT_INVITE: (teamId: string) => `/api/teams/${teamId}/accept-invite`,
  },
};

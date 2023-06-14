import { Project } from "./project";

export interface LoginUserPayload {
  login: string;
  password: string;
}

export interface RegisterUserPayload extends LoginUserPayload {
  name: string;
}

export interface RefreshTokenPayload {
  refreshToken: string;
}

export interface LoginUserResponse {
  accessToken: string;
  refreshToken: string;
  expires: string;
}

export interface CurrentUser {
  name: string;
  contacts: string;
  academicGroup: string;
}

export interface PortfolioProject {
  header: Project;
  rating: number;
  comment: string;
}

export type Portfolio = PortfolioProject[];

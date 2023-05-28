import { CurrentUser, Portfolio } from "../user";

export interface UserStore {
  token: string | null;
  refreshToken: string | null;
  currentUser: CurrentUser | null;
  portfolio: Portfolio | null;
}

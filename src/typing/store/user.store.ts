import { CurrentUser } from "../user";

export interface UserStore {
  token: string | null;
  refreshToken: string | null;
  currentUser: CurrentUser | null;
}

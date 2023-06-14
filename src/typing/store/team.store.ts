import { Invitations, Students, Team } from "../team";

export interface TeamStore {
  team: Team | null;
  invitations: Invitations;
  students: Students | null;
}

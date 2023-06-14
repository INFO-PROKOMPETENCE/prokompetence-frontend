export interface Teammate {
  studentId: string;
  studentName: string;
  roleId: number;
  isTeamLead: boolean;
  studentAcademicGroup: string;
  studentContacts: string;
}

export interface Team {
  teamId: string;
  name: string;
  projectId: string;
  students: Teammate[];
}

export interface Student {
  id: string;
  name: string;
}

export interface Students {
  items: Student[];
  total: number;
}

export interface CreateTeamPayload {
  name: string;
}

export type Invitations = Team[];

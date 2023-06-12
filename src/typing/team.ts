export interface Teammate {
  studentId: string;
  studentName: string;
  // roleId: number;
  isTeamLead: boolean;
}

export interface Team {
  teamId: string;
  name: string;
  students: Teammate[];
}

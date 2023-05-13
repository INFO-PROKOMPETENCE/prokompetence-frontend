export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  maxStudentsCountInTeam: number;
  maxTeamsCount: number;
  recordedTeamsCount: number;
  organizationName: string;
  curatorName: string;
  lifeScenarioId: number;
  keyTechnologyId: number;
  complexity: number;
}

export interface CreateProjectPayload {
  name: string;
  description: string;
  finalProject: string;
  shortDescription: string;
  maxStudentsCountInTeam: number;
  maxTeamsCount: number;
  isOpened: boolean;
  organizationId: string;
  lifeScenarioId: number;
  keyTechnologyId: number;
  complexity: number;
}

export interface ProjectList {
  totalCount: number;
  items: Project[];
}

export interface ProjectInformation {
  description: string;
  finalProject: string;
  teams: string[];
}

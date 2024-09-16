export interface Project {
    projectId: number;
    name: string;
    description?: string;
    employeeProjects?: EmployeeProject[] | null;
  }
  export interface EmployeeProject {
    employeeId: number;
    projectId: number;
    project: Project;
  }
  
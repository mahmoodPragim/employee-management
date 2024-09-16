export interface Project {
    projectId: number;
    name: string;
    description?: string;
    employeeProjects?: EmployeeProject[] | null; // Can be null or empty
  }
  export interface EmployeeProject {
    employeeId: number;
    projectId: number;
    project: Project;
  }
  
import { EmployeeProject } from "./project.model";

export interface ApiResponse<T> {
    status: string;
    data: T;
    error?: string;
    details?: { [key: string]: string[] };
  }
  
  export interface Employee {
    employeeId?: number;
    name: string;
    email?: string;
    employeeProjects?: EmployeeProject[];
  }
  

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiResponse, Employee } from '../interfaces/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5059/api/Employees'; 

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<ApiResponse<Employee[]>> {
    return this.http.get<ApiResponse<Employee[]>>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getEmployeeById(id: number): Observable<ApiResponse<Employee>> {
    return this.http.get<ApiResponse<Employee>>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveEmployee(employeeDto: Employee): Observable<ApiResponse<Employee>> {
    return this.http.post<ApiResponse<Employee>>(this.apiUrl, employeeDto).pipe(
      catchError(this.handleError)
    );
  }

  assignEmployeesToProjects(request: any): Observable<ApiResponse<any>> {
    const url = `${this.apiUrl}/assignEmployeesOnProjects`;
    return this.http.post<ApiResponse<any>>(url, request).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }
}

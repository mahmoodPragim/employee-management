import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/employee.model';
import { Project } from '../interfaces/project.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:5059/api/Project'; 

  constructor(private http: HttpClient) {}
  getProjects(): Observable<ApiResponse<Project[]>> {
    return this.http.get<ApiResponse<Project[]>>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    throw error;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Employee, ApiResponse } from '../../interfaces/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, TableModule,ToastModule, CardModule, ButtonModule,RouterOutlet],
  providers: [MessageService],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((response: ApiResponse<Employee[]>) => {
      if (response.status === 'Success') {
        this.employees = response.data || [];
      } else {
        console.error('Failed to load employees:', response.error);
      }
    });
  }

  viewEmployee(id: number): void {
    this.router.navigate(['/employees/details', id]);
  }

  addNewEmployee(): void {
    this.router.navigate(['/employees/create']);
  }
  
  editEmployee(id: number): void {
    this.router.navigate(['/employees/edit', id]);
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee, ApiResponse } from '../../interfaces/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, CardModule, TableModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent {
  employee: Employee | null = null;
  employeeId: number | null = null;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    debugger
    this.route.params.subscribe(params => {
      this.employeeId = params['id'] ? +params['id'] : null;
      if (this.employeeId) {
        this.loadEmployeeDetails();
      }
    });
  }

  loadEmployeeDetails(): void {
    if (this.employeeId !== null) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe((response: ApiResponse<Employee>) => {
        if (response.status === 'Success') {
          this.employee = response.data;
        } else {
          console.error('Failed to load employee:', response.error);
        }
      });
    }
  }

}

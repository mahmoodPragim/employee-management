import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ApiResponse, Employee } from '../../interfaces/employee.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
    CardModule
  ], 
    templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  providers: [MessageService]
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  employeeId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.email]],
    });
  }

  ngOnInit(): void {
    debugger
  
  }

  loadEmployee(): void {
    if (this.employeeId !== null) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe((response: ApiResponse<Employee>) => {
        if (response.status === 'Success') {
          const employee = response.data;
          this.employeeForm.patchValue({
            name: employee.name,
            email: employee.email
          });
        } else {
          console.error('Failed to load employee:', response.error);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    const employeeData: Employee = this.employeeForm.value;

    if (this.isEditMode && this.employeeId !== null) {
      employeeData.employeeId = this.employeeId;

      this.employeeService.saveEmployee(employeeData).subscribe((response: ApiResponse<Employee>) => {
        if (response.status === 'Success') {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee updated successfully.' });
          this.router.navigate(['/employees']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error || 'Failed to update employee.' });
        }
      });
    } else {
      this.employeeService.saveEmployee(employeeData).subscribe((response: ApiResponse<Employee>) => {
        if (response.status === 'Success') {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee added successfully.' });
          this.router.navigate(['/employees']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error || 'Failed to add employee.' });
        }
      });
    }
  }
}

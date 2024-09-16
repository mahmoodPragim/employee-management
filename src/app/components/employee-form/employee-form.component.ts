import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { ApiResponse, Employee } from '../../interfaces/employee.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { Project } from '../../interfaces/project.model';
import { ProjectService } from '../../services/project.service';
import { TableModule } from 'primeng/table';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    ReactiveFormsModule,
    MessageModule,
    ToastModule,
    CardModule,
    TableModule,
    FloatLabelModule
  ],

  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  providers: [MessageService]
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode: boolean = false;
  employeeId: number | null = null;
  projects: Project[] = []; 
  assignedProjects: Project[] = []; 

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.email]],
      assignedProjects: [[]] 
    });
  }

  ngOnInit(): void {
  
    this.route.params.subscribe(params => {
      this.employeeId = params['id'] ? +params['id'] : null;
      this.isEditMode = !!this.employeeId;
  
      this.loadProjects();
  
      if (this.isEditMode) {
        this.loadEmployee(); 
      }
    });
  }
  

  loadEmployee(): void {
    if (this.employeeId !== null) {
      this.employeeService.getEmployeeById(this.employeeId).subscribe((response: ApiResponse<Employee>) => {
        if (response.status === 'Success') {
          const employee = response.data;
          
          const assignedProjectIds = employee.employeeProjects?.map(ep => ep.project.projectId) || [];
          this.employeeForm.patchValue({
            name: employee.name,
            email: employee.email,
          });

          this.assignedProjects = employee.employeeProjects?.map(ep => ep.project) || [];
        } else {
          console.error('Failed to load employee:', response.error);
        }
      });
    }
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((response: ApiResponse<Project[]>) => {
      if (response.status === 'Success') {
        this.projects = response.data;
      } else {
        console.error('Failed to load projects:', response.error);
      }
    });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      return;
    }

    const employeeData: any = {email:this.employeeForm.value.email,name:this.employeeForm.value.name};

    if (this.isEditMode && this.employeeId !== null) {
      employeeData.employeeId = this.employeeId;

      this.employeeService.saveEmployee(employeeData).subscribe((response: ApiResponse<Employee>) => {
        if (response.status === 'Success') {
          this.assignProjectsToEmployee();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee updated successfully.' });
          this.router.navigate(['/employees']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error || 'Failed to update employee.' });
        }
      });
    } else {
      this.employeeService.saveEmployee(employeeData).subscribe((response: ApiResponse<Employee>) => {
        if (response.status === 'Success') {
          this.assignProjectsToEmployee();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Employee added successfully.' });
          this.router.navigate(['/employees']);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error || 'Failed to add employee.' });
        }
      });
    }
  }

  assignProjectsToEmployee(): void {
    const selectedProjects = this.employeeForm.get('assignedProjects')?.value || [];
    const request = {
      employeeIds: [this.employeeId],
      projectIds: selectedProjects.map((project: Project) => project.projectId) 
    };
    this.employeeService.assignEmployeesToProjects(request).subscribe(response => {
      if (response.status === 'Success') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Projects assigned successfully.' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error || 'Failed to assign projects.' });
      }
    });
  }
}

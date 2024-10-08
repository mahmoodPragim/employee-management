import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/edit/:id', component: EmployeeFormComponent },
  { path: 'employees/create', component: EmployeeFormComponent },
  { path: 'employees/details/:id', component: EmployeeDetailComponent },
  { path: '**', redirectTo: '/employees' }
];
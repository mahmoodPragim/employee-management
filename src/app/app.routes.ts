import { Routes } from '@angular/router';
import { EmployeeDetailComponent } from './components/employee-detail/employee-detail.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
  { path: 'form', component: EmployeeFormComponent },
  { path: 'form/:id', component: EmployeeFormComponent },
  { path: 'employees', component: EmployeeListComponent },
  { path: 'details/:id', component: EmployeeDetailComponent },
  { path: '**', redirectTo: '/employees' }
];
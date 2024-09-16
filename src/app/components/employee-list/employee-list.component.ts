import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule,TableModule,CardModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'IT' },
    { id: 2, name: 'Jane Smith', position: 'Project Manager', department: 'Marketing' },
    { id: 3, name: 'Mike Johnson', position: 'UX Designer', department: 'Design' }
  ];

}

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { HomeComponent } from '../components/home/home.component';
import { EmployeeComponent } from '../../employees/pages/employee/employee.component';
import { CustomerComponent } from '../../customers/pages/customer/customer.component';
import { EquipmentComponent } from '../../equipment/pages/equipment/equipment.component';
<<<<<<< HEAD
=======
import { EquipmentAssignmentComponent } from '../../equipment/pages/equipmentAssignment/equipmentAssignment.component';
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73

export const dashboard_routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'inventory-control', component: HomeComponent },
<<<<<<< HEAD
      { path: 'equipment-assingment', component: EquipmentComponent },
=======
      { path: 'equipment-assignment', component: EquipmentAssignmentComponent },
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
      { path: 'equipment', component: EquipmentComponent },
      { path: 'employees', component: EmployeeComponent },
      { path: 'clients', component: CustomerComponent },
            {
          path: 'setting',
          loadChildren: () =>
            import('../../setting/routes/setting.routing').then((m) => m.setting_routes),
        },
    ],
  },
];

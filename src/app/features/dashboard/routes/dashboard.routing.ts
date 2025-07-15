import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { HomeComponent } from '../components/home/home.component';
import { EmployeeComponent } from '../../employees/pages/employee/employee.component';
import { CustomerComponent } from '../../customers/pages/customer/customer.component';
import { EquipmentComponent } from '../../equipment/pages/equipment/equipment.component';
import { EquipmentAssignmentComponent } from '../../equipment/pages/equipmentAssignment/equipmentAssignment.component';
import { SupplierComponent } from '../../suppliers/pages/supplier/supplier.component';

export const dashboard_routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'inventory-control', component: HomeComponent },
      { path: 'equipment-assignment', component: EquipmentAssignmentComponent },
      {
        path: 'equipment',
        children: [
          { path: '', component: EquipmentComponent },
          {
            path: 'detail',
            loadComponent: () =>
              import(
                '../../equipment/pages/equipmentDetail/equipmentDetail.component'
              ).then((m) => m.EquipmentDetailComponent),
          },
        ],
      },
      { path: 'employees', component: EmployeeComponent },
      { path: 'clients', component: CustomerComponent },
      { path: 'supplier', component: SupplierComponent },
      {
        path: 'setting',
        loadChildren: () =>
          import('../../setting/routes/setting.routing').then(
            (m) => m.setting_routes
          ),
      },
    ],
  },
];

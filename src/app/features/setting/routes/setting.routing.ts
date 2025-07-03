import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from '../pages/setting/setting.component';
import { UserComponent } from '../../users/pages/user/user.component';
import { RoleComponent } from '../../roles/pages/role/role.component';
import { PrivilegeComponent } from '../../privilege/pages/privilege/privilege.component';
import { MenuComponent } from '../../menu/pages/menu/menu.component';


export const setting_routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      { path: 'users', component: UserComponent },
      { path: 'roles', component: RoleComponent },
      { path: 'permissions', component: PrivilegeComponent },
      { path: 'menus', component: MenuComponent },
    ],
  },
];

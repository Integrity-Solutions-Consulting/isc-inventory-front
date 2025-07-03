<<<<<<< HEAD
import { PrivilegeResponseDTO } from "./PrivilegeResponseDTO";

export interface RolesResponseDTO { 
    id: number;
    name: string;
    active: boolean;
    rolePrivileges: Set<PrivilegeResponseDTO>;
}
=======
import { MenuResponseDTO } from './MenuResponseDTO';
import { PrivilegeResponseDTO } from './PrivilegeResponseDTO';

export interface RolesResponseDTO {
  id: number;
  name: string;
  description: string;
  active: boolean;
  rolePrivileges?: PrivilegeResponseDTO[];
  menus?: MenuResponseDTO[];
  applicationId: number;
  creationDate?: string;
}
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73

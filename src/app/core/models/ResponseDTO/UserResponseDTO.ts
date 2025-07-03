<<<<<<< HEAD
=======
import { MenuResponseDTO } from "./MenuResponseDTO";
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
import { PrivilegeResponseDTO } from "./PrivilegeResponseDTO";
import { RolesResponseDTO } from "./RolesResponseDTO";

export interface UserResponseDTO { 
    id: number;
    username: string;
    email: string;
    firstNames: string;
    employeeId: number;
    lastModificationDate?: string;
    lastConnection?: string;
    active?: boolean;
    suspended?: boolean;
    roles?: Set<RolesResponseDTO>;
    privileges?: Set<PrivilegeResponseDTO>;
<<<<<<< HEAD
=======
    menus?: Set<MenuResponseDTO>;
>>>>>>> 2dafe857f2557c49466b120dd49569973c1cfb73
    loggedIn?: boolean;
}
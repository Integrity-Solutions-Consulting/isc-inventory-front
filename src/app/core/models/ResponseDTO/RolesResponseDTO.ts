import { PrivilegeResponseDTO } from "./PrivilegeResponseDTO";

export interface RolesResponseDTO { 
    id: number;
    name: string;
    active: boolean;
    rolePrivileges: Set<PrivilegeResponseDTO>;
}
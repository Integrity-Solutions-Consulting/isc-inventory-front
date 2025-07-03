import { EmployeeCatalogResponseDTO } from "../administration/EmployeeCatalogResponseDTO";
import { CompanyResponseDTO } from "./CompanyResponseDTO";
import { EquipmentResponseDTO } from "./EquipmentResponseDTO";

export interface EquipmentAssignmentDetailResponseDTO{
    id:number,
    employee: EmployeeCatalogResponseDTO,
    equipment: EquipmentResponseDTO,
    company: CompanyResponseDTO,
    assignmentDate: string,
    returnDate: string,
    status:boolean

}
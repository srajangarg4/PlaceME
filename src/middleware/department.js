import { DeptarmentService } from 'placeme-services/lib';
const departmentService = new DeptarmentService();

export const fetchAllDepartments = () => departmentService.getAll();

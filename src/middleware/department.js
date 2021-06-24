import { DeptarmentService } from 'placeme-services/lib';
const service = new DeptarmentService();

export const fetchAllDepartments = () => service.getAll();

export const addDepartment = (department) =>
  service.set(department, department?.abbrivation);

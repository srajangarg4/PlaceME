import { DeptarmentService } from 'placeme-services/lib';
const service = new DeptarmentService();

export const fetchAllDepartments = () => service.getAll();

export const fetchDepartment = (id) => service.get(id);

export const addDepartment = (department) =>
  service.set(department, department?.abbrivation);

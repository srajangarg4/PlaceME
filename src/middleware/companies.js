import { CompanyService } from 'placeme-services/lib';

const service = new CompanyService();

export const fetchAllCompanies = () => service.getAll();

export const fetchCompanies = (noOfRecords = 3) =>
  service.getNext(noOfRecords, 'name');

export const fetchCompanyById = (id) => service.get(id);

export const addNewCompany = (company) => service.add(company);

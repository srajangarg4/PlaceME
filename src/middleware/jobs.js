import { CompanyService, JobService } from 'placeme-services/lib';

const jobService = new JobService();
const companyService = new CompanyService();

export const fetchJobs = (numOfRecords = 3) => {
  return jobService.getNext(numOfRecords, 'postDate');
};

export const fetchCompaniesAndJobs = async () => {
  const jobResult = await jobService.getAll();
  const companyResult = await companyService.getAll();
  return {
    successful: jobResult.successful && companyResult.successful,
    result: { jobs: jobResult.result, companies: companyResult.result },
    error: jobResult.error ?? companyResult.error,
  };
};

export const fetchJobAndCompanyDetails = async (id, companies, jobs) => {
  let companyId;
  let jobResult;
  if (!jobs[id]) {
    const jobService = new JobService();
    jobResult = await jobService.get(id);

    if (!jobResult.successful) {
      return { successful: false, error: jobResult.error };
    }
    companyId = jobResult.result.data.company;
  } else {
    companyId = jobs[id].company;
  }

  if (!companies[companyId]) {
    const companyService = new CompanyService();
    const companyResult = await companyService.get(companyId);
    return {
      successful: companyResult.successful,
      result: { job: jobResult?.result, company: companyResult.result },
      error: companyResult.error,
    };
  } else {
    return { successful: true, result: { job: jobResult.result } };
  }
};

export const addJob = (job) => jobService.add(job);

export const fetchJobsByCompany = (companyId) =>
  jobService.getAllByCompanyId(companyId);

export const setJob = ({ job, id }) => jobService.set(job, id);

export const fetchJob = (id) => jobService.get(id);

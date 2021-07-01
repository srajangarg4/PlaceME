import { JobApplicationService } from 'placeme-services/lib';

const service = new JobApplicationService();

export const applyForJob = (id) => service.add(id);

export const fetchJobApplication = (id) => service.get(id);

export const updateJobApplication = ({ jobApplication, id }) =>
  service.update(jobApplication, id);

export const fetchJobApplications = () =>
  service.getAllApplicationsOfCurrentUser();

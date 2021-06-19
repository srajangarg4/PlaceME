import { JobApplicationService } from 'placeme-services/lib';

const service = new JobApplicationService();

export const applyForJob = (id) => service.add(id);

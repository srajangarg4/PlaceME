import { CompletedRequestService } from 'placeme-services/lib';

export const fetchAllCompletedRequests = () => {
  const service = new CompletedRequestService();
  return service.getCurrentUserCompletedRequests();
};

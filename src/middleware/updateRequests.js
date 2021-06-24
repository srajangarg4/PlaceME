import { Role } from 'utils';
import { PendingRequestService } from 'placeme-services/lib';

const service = new PendingRequestService();

export const fetchAllPendingRequests = (role) => {
  switch (role) {
    case Role.TPO:
      return service.getAll();
    case Role.STUDENT: {
      return service.getCurrentUserPendingRequests();
    }
    default:
      return service.getAll();
  }
};

export const fetchPendingRequest = (noOfRecords = 5) =>
  service.getNext(noOfRecords, 'requestedOn');

export const acceptRequest = (id) => service.approveRequest(id);

export const rejectRequest = (id) => service.rejectRequest(id);

export const fetchPendingRequestDetail = (id) => service.get(id);

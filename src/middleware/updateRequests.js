import { Roles } from 'utils';
import { PendingRequestService } from 'placeme-services/lib';

const service = new PendingRequestService();

export const fetchAllPendingRequests = (role) => {
  switch (role) {
    case Roles.TPO:
      return service.getAll();
    case Roles.STUDENT: {
      return service.getCurrentUserPendingRequests();
    }
    default:
      return service.getAll();
  }
};

export const fetchPendingRequest = (noOfRecords = 5) =>
  service.getNext(noOfRecords, 'requestedOn');

export const approveRequest = async (id) => {
  const { successful, error } = await service.approveRequest(id);
  if (successful) {
    console.log('Approved succesfully');
  } else {
    console.log('Ërror', error);
  }
};

export const rejectRequest = async (id) => {
  const { successful, error } = await service.rejectRequest(id);
  if (successful) {
    console.log('Rejected succesfully');
  } else {
    console.log('Ërror', error);
  }
};

export const fetchPendingRequestDetail = service.get;

export const addNewDocument = async (
  { title, updates, comment },
  resolve,
  reject,
) => {
  const { successful, result, error } = await service.add({
    type: 'DOCUMENT',
    updatesRequired: updates,
    title,
    comment,
  });
  if (successful) {
    resolve?.(result);
  } else {
    reject?.(error);
  }
};

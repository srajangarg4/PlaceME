import { Roles } from "utils";
import { PendingRequestService } from "placeme-services/lib";

export const fetchPendingRequests = (role) => {
    const service = new PendingRequestService();
    switch (role) {
        case Roles.TPO:
            return service.getAll();
        case Roles.STUDENT: {
            return service.getCurrentUserPendingRequests();
        }
        default:
            return service.getPendingRequestsOf('');
    }
} 
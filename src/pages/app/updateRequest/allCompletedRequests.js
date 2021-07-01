import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { resolveDate, Routes } from 'utils';
import { Card, Loader, Navbar } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import { useDatabase } from 'hooks';
import { addCompletedRequests } from 'actions/completedRequest';
import { fetchAllCompletedRequests } from 'middleware/completedRequest';
import { showError } from 'components/toast';

const PendingRequests = ({ type, title, requestedBy, requestedOn, id }) => (
  <Card className="row rounded p-4 mt-4">
    <div className={`col-12 rounded ${type ?? ''}`}>
      <h5 className="">{title}</h5>
      <div className="my-3">
        <p className="text-muted mb-2">Requested by: {requestedBy}</p>
        <p className="text-muted">
          Requested on: {resolveDate(requestedOn).toLocaleDateString()}
        </p>
      </div>
      <Link to={`${Routes.updateRequestDetail.path}${id}`}>View Details</Link>
    </div>
  </Card>
);

const AllCompletedRequests = () => {
  const { requests, hasAlreadyFetchedRequests } = useSelector(
    (state) => state.completedRequest,
  );
  const { loading, callDatabase } = useDatabase(fetchAllCompletedRequests);
  const dispatch = useDispatch();

  console.log(requests);

  useEffect(() => {
    if (!hasAlreadyFetchedRequests) {
      callDatabase((data) => {
        dispatch(addCompletedRequests(data));
      }, showError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-10">
            <Card shadow>
              <div className="card-header bg-white">
                <h4 className="text-center pt-3">Completed Requests</h4>
              </div>
              <div className="card-body mx-3">
                {loading ? (
                  <Loader />
                ) : (
                  Object.keys(requests).map((request) => {
                    return (
                      <PendingRequests
                        id={request}
                        key={request}
                        {...requests[request]}
                      />
                    );
                  })
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <Navbar />
    //   <div className="container">
    //     {updateRequests?.length !== 0 ? (
    //       updateRequests?.map((request) => {
    //         const {
    //           data: { requestedOn, studentEmail, title },
    //           id,
    //         } = request;
    //         return (
    //           <PendingRequests
    //             key={id}
    //             requestedOn={resolveDate(requestedOn).toLocaleDateString()}
    //             requestedBy={studentEmail}
    //             id={id}
    //             title={title}
    //           />
    //         );
    //       })
    //     ) : (
    //       <h4>No Completed Request</h4>
    //     )}
    //   </div>
    // </div>
  );
};
export default AllCompletedRequests;

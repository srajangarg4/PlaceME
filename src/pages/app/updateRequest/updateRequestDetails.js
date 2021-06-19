import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { Button, Loader, Navbar, Toast, Card } from 'components';
import { useDatabase } from 'hooks';
import { flattenObject, reduceToLevel, resolveDate } from 'utils';
import { addUpdateRequest } from 'actions';
import {
  approveRequest,
  rejectRequest,
  fetchPendingRequestDetail,
} from 'middleware';

const CurrentData = () => {
  return (
    <Card>
      <div className="px-5 py-4">
        <h4 className="text-center">Existing Data</h4>
        <hr />
        <p>Mobile number: 9602998878</p>
        <p>Mobile number: 9602998878</p>
      </div>
    </Card>
  );
};

const NewData = ({ data }) => {
  return (
    <Card>
      <div className="px-5 py-4">
        <h4 className="text-center">Data to validate</h4>
        <hr />
        {Object.keys(data).map((key, i) => (
          <p key={i.toString()}>
            {key} : {data[key]}{' '}
          </p>
        ))}
        {/* <p>Semester 5 Marksheet: </p>
        <p>Semester 5 Percentage: 75</p> */}
        <hr />
        <p className="text-muted">
          In the recent exam i have passed by maths backlog.
        </p>
      </div>
    </Card>
  );
};

NewData.defaultProps = {
  data: {},
};

const MetaData = ({ requestedBy, requestedOn, type }) => {
  return (
    <Card>
      <div className="p-5">
        <p>Requested on: {requestedOn}</p>
        <p>Requested by: {requestedBy}</p>
        <p>Category: {type ?? 'Academic Details'}</p>
        <a href="/sdd">View Student Data</a>
      </div>
    </Card>
  );
};

const Header = ({ heading }) => {
  return (
    <Card>
      <p className="display-4 text-capitalize text-center">{heading}</p>
    </Card>
  );
};

const ApprovalOptions = ({ onApprove, onReject }) => {
  return (
    <Card className="p-3">
      <Button
        fullWidth
        text="Verify Data"
        buttonClassName="btn btn-outline-primary"
        iconName="done"
        onClick={onApprove}
      />
      <Button
        fullWidth
        text="Reject Update"
        buttonClassName="btn  btn-outline-danger"
        iconName="close"
        onClick={onReject}
      />
    </Card>
  );
};

const PendingRequestDetail = ({
  title,
  updatesRequired,
  requestedBy,
  requestedOn,
  type,
  id,
  approveRequest,
  rejectRequest,
}) => {
  const history = useHistory();
  return (
    <div className="container">
      <Header heading={title} />
      <div className="row">
        <div className="col-md-8 col-12">
          <NewData data={flattenObject(reduceToLevel(updatesRequired, 2))} />
          <CurrentData />
        </div>
        <div className="col-md-4 col-12">
          <MetaData
            requestedBy={requestedBy}
            requestedOn={resolveDate(requestedOn).toLocaleDateString()}
            type={type}
          />
          <ApprovalOptions
            onApprove={approveRequest}
            onReject={rejectRequest}
          />
        </div>
      </div>
    </div>
  );
};

const UpdateRequestDetails = () => {
  const { id } = useParams();
  const { loading, callDatabase, errors } = useDatabase(() =>
    fetchPendingRequestDetail(id),
  );
  const { requests } = useSelector((state) => state.updateRequest);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!requests[id]) {
      callDatabase(
        (data) => {
          dispatch(addUpdateRequest(data));
        },
        (error) => {
          console.log(error);
        },
      );
    }
  }, []);
  return (
    <div>
      <Toast show={!!errors} />
      <Navbar />
      {loading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <PendingRequestDetail
          type={requests[id]?.type}
          updatesRequired={requests[id]?.updatesRequired}
          id={id}
          requestedBy={requests[id]?.studentEmail}
          requestedOn={requests[id]?.requestedOn}
          title={requests[id]?.title}
          approveRequest={approveRequest}
        />
      )}
    </div>
  );
};

export default UpdateRequestDetails;

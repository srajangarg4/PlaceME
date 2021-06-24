import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Loader, Navbar, Toast, Card } from 'components';
import { useDatabase } from 'hooks';
import { flattenObject, reduceToLevel, resolveDate, Role } from 'utils';
import { addUpdateRequest } from 'actions';
import { fetchPendingRequestDetail } from 'middleware';
import { ApprovalOptions } from './components';

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

const NewData = ({ data = {} }) => {
  console.log('Data in new', data);
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
        <p className="text-muted">{data?.comment}</p>
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

const PendingRequestDetail = ({
  title,
  updatesRequired,
  requestedBy,
  requestedOn,
  type,
  id,
}) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="container">
      <Header heading={title} />
      <div className="row">
        <div className="col-md-8 col-12">
          <NewData data={flattenObject(reduceToLevel(updatesRequired, 2))} />
          <CurrentData data={flattenObject(updatesRequired)} />
        </div>
        <div className="col-md-4 col-12">
          <MetaData
            requestedBy={requestedBy}
            requestedOn={resolveDate(requestedOn).toLocaleDateString()}
            type={type}
          />
          {user?.role !== Role.STUDENT && <ApprovalOptions id={id} />}
        </div>
      </div>
    </div>
  );
};

const UpdateRequestDetails = () => {
  const { id } = useParams();
  const { requests } = useSelector((state) => state.updateRequest);
  const { loading, callDatabase, errors } = useDatabase(
    fetchPendingRequestDetail,
    !requests[id],
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Id', id);
    if (!requests[id]) {
      callDatabase(
        (data) => {
          console.log('data reviced', data);
          dispatch(addUpdateRequest(data));
        },
        (error) => {
          console.log(error);
        },
        id,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <PendingRequestDetail {...requests[id]} id={id} />
      )}
    </div>
  );
};

export default UpdateRequestDetails;

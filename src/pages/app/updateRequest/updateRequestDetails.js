import { Button } from 'components';
import Card from 'components/card';
import { PendingRequestService } from 'placeme-services/lib';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { flattenObject, map, reduceToLevel, resolveDate } from 'utils';

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

const ApprovalOptions = ({ onApprove }) => {
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
      />
    </Card>
  );
};

const UpdateRequestDetails = () => {
  const updateRequests = useSelector((state) => state.updateRequests);
  const academicDetail = useSelector((state) => state.academicDetail);
  const { id } = useParams();

  const service = new PendingRequestService();

  const { requests } = { ...updateRequests };
  const request = requests?.filter((req) => req?.id === id)[0];
  const { data } = { ...request };
  const { updatesRequired, title } = { ...data };
  const { requestedOn, studentEmail: requestedBy, type } = { ...data };
  console.log('Data recived', updatesRequired, requestedOn, requestedBy, type);
  const temp = academicDetail['17egjcs161@gitjaipur.com'];
  map(updatesRequired, temp);
  console.log('Personal Detail after modify', temp);
  return (
    <div className="container">
      <Header heading={title} />
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <NewData data={flattenObject(reduceToLevel(updatesRequired, 2))} />
          <CurrentData />
        </div>
        <div className="col-md-4 col-sm-12">
          <MetaData
            requestedBy={requestedBy}
            requestedOn={resolveDate(requestedOn).toLocaleDateString()}
            type={type}
          />
          <ApprovalOptions
            onApprove={async () => {
              const { successful, error } = await service.approveRequest(id);
              if (successful) {
                console.log('Successful');
              } else {
                console.log('Ërror', error);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateRequestDetails;

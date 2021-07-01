import { removeUpdateRequest } from 'actions';
import { Button, Card } from 'components';
import { showError, showSuccess } from 'components/toast';
import { useDatabase } from 'hooks';
import { acceptRequest, rejectRequest } from 'middleware';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const AcceptRequest = ({ id }) => {
  const { loading, callDatabase } = useDatabase(acceptRequest);
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  return (
    <Button
      fullWidth
      text="Verify Data"
      loading={loading}
      buttonClassName="btn btn-outline-primary"
      iconName="done"
      onClick={() =>
        callDatabase(
          (result) => {
            dispatch(removeUpdateRequest(id));
            showSuccess('Request Accepted Successfully');
            goBack();
          },
          showError,
          id,
        )
      }
    />
  );
};

const RejectRequest = ({ id }) => {
  const { loading, callDatabase } = useDatabase(rejectRequest);
  const { goBack } = useHistory();
  const dispatch = useDispatch();
  return (
    <Button
      fullWidth
      text="Reject Update"
      loading={loading}
      buttonClassName="btn  btn-outline-danger"
      iconName="close"
      onClick={() =>
        callDatabase(
          (result) => {
            dispatch(removeUpdateRequest(id));
            showSuccess('Request Rejected Successfully');
            goBack();
          },
          showError,
          id,
        )
      }
    />
  );
};
const ApprovalOptions = ({ id }) => {
  return (
    <Card className="p-3">
      <AcceptRequest id={id} />
      <RejectRequest id={id} />
    </Card>
  );
};
export default ApprovalOptions;

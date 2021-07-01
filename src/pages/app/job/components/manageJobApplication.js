import { addJobApplication } from 'actions/jobApplication';
import { Card, Input, Checkbox, SelectOption, Button } from 'components';
import { useDatabase, useFormReducer } from 'hooks';
import {
  fetchJobApplication,
  updateJobApplication,
} from 'middleware/jobApplication';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  generateJobApplicationId,
  required,
  unflatten,
  validateEmail,
  validateNumber,
} from 'utils';
import { showError, showSuccess } from 'components/toast';

const searchStudentValidators = {
  email: [required('Student Email is required'), validateEmail],
};

const jobApplicationValidators = {
  status_roundsQualified: [
    required('Please specify number of rounds qualified.'),
    validateNumber,
  ],
};

const noOfRoundsQualifiedOptions = (job) => {
  const totalRounds = job?.rounds?.length;
  const options = [];
  for (let index = 1; index <= totalRounds; index++) {
    options.push({ text: index, value: index });
  }
  return options;
};

const UpdateJobApplication = ({
  jobApplication,
  job,
  jobId,
  searchChange,
  setState,
}) => {
  const jobApplicationInitialValues = {
    isPlaced: jobApplication?.isPlaced,
    status_isPending: jobApplication?.status?.isPending,
    status_roundsQualified: jobApplication?.status?.roundsQualified,
    status_message: '',
  };
  const { submitting, connectField, handleSubmit } = useFormReducer(
    jobApplicationValidators,
    jobApplicationInitialValues,
  );
  const { loading, callDatabase } = useDatabase(updateJobApplication);
  const dispatch = useDispatch();
  return (
    <>
      <h6 className="pt-3 pb-2">Update Job Application Status</h6>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(unflatten(data));
          const customJobApplicationId = generateJobApplicationId(
            jobId,
            jobApplication?.studentEmail,
          );
          callDatabase(
            (result) => {
              dispatch(addJobApplication(result));
              showSuccess('Job Application Updated Successfully');
              searchChange('email', '');
              setState();
            },
            showError,
            { jobApplication: unflatten(data), id: customJobApplicationId },
          );
        })}
      >
        {connectField('isPlaced', {
          label: 'Is Placed',
        })(Checkbox)}
        {connectField('status_isPending', {
          label: 'Is Pending',
        })(Checkbox)}
        {connectField('status_roundsQualified', {
          label: 'No. of Rounds Qualified',
          options: noOfRoundsQualifiedOptions(job),
          required: true,
        })(SelectOption)}
        {connectField('status_message', {
          label: 'Message',
        })(Input)}
        <Button
          text="Update"
          type="submit"
          fullWidth
          loading={loading || submitting}
        />
      </form>
    </>
  );
};

const ManageJobApplication = ({ job, jobId }) => {
  const { connectField, handleSubmit, change } = useFormReducer(
    searchStudentValidators,
  );
  const { jobApplications } = useSelector((state) => state.jobApplication);
  const { callDatabase } = useDatabase(fetchJobApplication);

  const dispatch = useDispatch();
  const [state, setState] = useState();
  return (
    <Card shadow>
      <div className="card-body">
        <h4 className="card-title pt-3 px-1">Manage Job Applications</h4>
        <hr className="pt-1 pb-2" />
        <form
          onSubmit={handleSubmit((data) => {
            const { email } = data;
            const customJobApplicationId = generateJobApplicationId(
              jobId,
              email,
            );
            if (jobApplications[customJobApplicationId]) {
              setState(jobApplications[customJobApplicationId]);
            } else {
              callDatabase(
                (result) => {
                  dispatch(addJobApplication(result));
                  setState(result?.data);
                },
                showError,
                customJobApplicationId,
              );
            }
          })}
        >
          {connectField('email', {
            type: 'search',
            placeholder: 'Enter Student Email',
          })(Input)}
        </form>
        {state && (
          <UpdateJobApplication
            jobApplication={state}
            job={job}
            jobId={jobId}
            searchChange={change}
            setState={setState}
          />
        )}
      </div>
    </Card>
  );
};

export default ManageJobApplication;

import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Card,
  Input,
  Navbar,
  TextArea,
  SelectOption,
  Button,
  DatePicker,
  MultipleSelect,
} from 'components';
import { jobTypes } from 'assets';
import { useDatabase, useFormReducer } from 'hooks';
import { required, unflatten, ensureArrayLength, Routes, validateNumber } from 'utils';
import { addJob, fetchAllCompanies, fetchAllDepartments } from 'middleware';
import { addCompanies, addJob as addJobAction, addDepartments } from 'actions';

const reduceOptions = (options = {}) => {
  const result = [];
  // eslint-disable-next-line array-callback-return
  Object.keys(options).map((key) => {
    const { name } = options[key];
    result.push({ text: name, value: key });
  });
  return result;
};

const createBatchOptions = () => {
  const result = [];
  const year = new Date().getFullYear();
  for (let index = year - 2; index < year + 4; index++) {
    result.push({ text: index, value: index });
  }
  return result;
};

const validators = {
  title: [required('Title is required to continue.')],
  description: [required('Description is required.')],
  forDepartments: [ensureArrayLength(1, 'Select atleast one options')],
  maxBacklogs: [required('Enter Max backlogs allowed.'), validateNumber],
  maxAcademicGap: [required('Enter academic gap allowed.'), validateNumber],
  company: [required('Please choose a company.')],
  salary_max: [required('Min salary is required'), validateNumber],
  salary_min: [required('Max salary is required'), validateNumber],
  rounds_0_name: [required('Enter name of the round.')],
  rounds_0_description: [required('Enter round description.')],
  location: [required('Location is required')],
  bond: [required('Bond type is required.')],
  jobType: [required('Choose a job type.')],
  lastDateToApply: [required('Enter last date to apply.')],
  forBatchs: [ensureArrayLength(1, 'Select atleast one options')],
};

const JobForm = () => {
  const { loading: isJobAdded, callDatabase: addJobToDB } = useDatabase(addJob);
  const { companies, hasAlreadyFetchedCompanies } = useSelector(
    (state) => state.company,
  );
  const { departments, hasAlreadyFetchedDepartments } = useSelector(
    (state) => state.department,
  );
  const { callDatabase: getCompanies } = useDatabase(
    fetchAllCompanies,
    !hasAlreadyFetchedCompanies,
  );
  const { callDatabase: getDepartments } = useDatabase(
    fetchAllDepartments,
    !hasAlreadyFetchedDepartments,
  );
  const { connectField, addField, handleSubmit, submitting } = useFormReducer(
    validators,
    {
      forDepartments: [],
      forBatchs: [],
    },
  );
  const [numOfRounds, setNumOfRounds] = useState(1);
  const dispatch = useDispatch();
  const { push } = useHistory();
  const companyOptions = reduceOptions(companies);
  const departmentOptions = reduceOptions(departments);
  const batchOptions = createBatchOptions();

  const addRoundField = useCallback(
    (index) => {
      addField(`rounds_${index}_name`, [required('Enter round name.')]);
      addField(`rounds_${index}_description`, [
        required('Enter round description.'),
      ]);
    },
    [addField],
  );

  useEffect(() => {
    if (!hasAlreadyFetchedCompanies) {
      getCompanies((data) => {
        dispatch(addCompanies(data));
      });
    }
    if (!hasAlreadyFetchedDepartments) {
      getDepartments((data) => {
        dispatch(addDepartments(data));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container">
        <Card shadow>
          <div className="card-header">
            <h4 className="text-center">Add New Job</h4>
          </div>
          <div className="card-body">
            <form
              onSubmit={handleSubmit((data) => {
                console.log('Data', unflatten(data));
                addJobToDB(
                  (result) => {
                    dispatch(addJobAction(result));
                    push(Routes.jobDetail.path + result?.id);
                  },
                  (error) => {
                    console.log(error);
                  },
                  unflatten(data),
                );
              })}
            >
              <div className="row">
                <div className="col-12 px-sm-5 py-2">
                  {connectField('title', {
                    label: 'Title',
                    required: true,
                  })(Input)}
                </div>
                <div className="col-12 px-sm-5 py-2">
                  {connectField('description', {
                    label: 'Description',
                    rows: 4,
                    required: true,
                  })(TextArea)}
                </div>
                <div className="col-12 px-sm-5 py-2">
                  {connectField('bond', {
                    label: 'Bond Description',
                    rows: 3,
                    required: true,
                  })(TextArea)}
                </div>
                <div className="col-12 px-sm-5 py-2">
                  {connectField('company', {
                    options: companyOptions,
                    required: true,
                    label: 'Company',
                  })(SelectOption)}
                </div>
                <div className="col-12 px-sm-5 py-2">
                  {connectField('jobType', {
                    options: jobTypes,
                    required: true,
                    label: 'Job Type',
                  })(SelectOption)}
                </div>
                <div className="col-12 col-sm-6 px-sm-5 py-2">
                  {connectField('location', {
                    required: true,
                    label: 'Location',
                  })(Input)}
                </div>
                <div className="col-12 col-sm-6 px-sm-5 py-2">
                  {connectField('lastDateToApply', {
                    required: true,
                    label: 'Last Date to Apply',
                  })(DatePicker)}
                </div>
                <div className="col-12 col-sm-6 px-sm-5 py-2">
                  {connectField('forDepartments', {
                    options: departmentOptions,
                    required: true,
                    label: 'For Departments',
                  })(MultipleSelect)}
                </div>
                <div className="col-12 px-sm-5 py-2">
                  {connectField('forBatchs', {
                    options: batchOptions,
                    required: true,
                    label: 'For Batch',
                  })(MultipleSelect)}
                </div>
                <div className="col-12 col-sm-6 px-sm-5 py-2">
                  {connectField('maxAcademicGap', {
                    required: true,
                    label: 'Max Academic gap',
                  })(Input)}
                </div>
                <div className="col-12 col-sm-6 px-sm-5 py-2">
                  {connectField('maxBacklogs', {
                    required: true,
                    label: 'Max Backlogs Allowed',
                  })(Input)}
                </div>
                <div className="col-12 col-sm-6 px-sm-5 py-2">
                  {connectField('salary_min', {
                    required: true,
                    label: 'Min Salary',
                  })(Input)}
                </div>
                <div className="col-12 col-sm-6 px-sm-5 py-2">
                  {connectField('salary_max', {
                    required: true,
                    label: 'Max salary',
                  })(Input)}
                </div>
                <h6 className="col-12 text-muted px-sm-5 py-2">Rounds</h6>
                <div className="col-12">
                  {[...Array(numOfRounds)].map((_, index) => {
                    return (
                      <div className="row" key={index.toString()}>
                        <div className="col-12 col-sm-6 px-sm-5 py-2">
                          {connectField(`rounds_${index}_name`, {
                            required: true,
                            label: `Round ${index + 1} Name`,
                          })(Input)}
                        </div>
                        <div className="col-12 col-sm-6 px-sm-5 py-2">
                          {connectField(`rounds_${index}_description`, {
                            required: true,
                            label: `Round ${index + 1} Description`,
                          })(Input)}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col-12 px-sm-5 py-2">
                  <Button
                    className="btn btn-outline-secondary d-flex align-items-center"
                    type="button"
                    text="Add Round"
                    iconName="add"
                    onClick={() => {
                      addRoundField(numOfRounds);
                      setNumOfRounds(numOfRounds + 1);
                    }}
                  />
                </div>
                <div className="col-12 mt-2 px-sm-5 py-2">
                  <Button
                    className="btn btn-block btn-primary"
                    type="submit"
                    text="Add Job"
                    loading={submitting || isJobAdded}
                  />
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobForm;

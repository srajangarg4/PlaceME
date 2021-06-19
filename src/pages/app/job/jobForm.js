import React, { useCallback } from 'react';
import { useState } from 'react';
import {
  Card,
  Input,
  Navbar,
  TextArea,
  SelectOption,
  Button,
} from 'components';
import { useFormReducer } from 'hooks';
import { required, unflatten } from 'utils';
import { courses, departments } from 'assets';
import { companies } from 'assets/companies';

const validators = {
  title: [required('Title is required to continue.')],
  description: [required('Description is required.')],
  forCourse: [required('Please select a course')],
  forDept: [required('Please select the target deptartment')],
  maxBacklogs: [],
  academicGap: [],
  company: [required('Please choose a compnay.')],
  minSalary: [required('min salary is required')],
  maxSalary: [required('max salary is required')],
};

const JobForm = () => {
  const { connectField, addField, handleSubmit, submitting } =
    useFormReducer(validators);
  const [numOfRounds, setNumOfRounds] = useState(0);

  const addRoundField = useCallback(
    (index) => {
      addField(`round_${index}_name`, [required('Enter round name.')]);
      addField(`round_${index}_description`, []);
    },
    [addField],
  );

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
              })}
            >
              <div className="row my-3">
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12">
                      {connectField('title', {
                        label: 'Title',
                        required: true,
                      })(Input)}
                    </div>
                    <div className="col-12">
                      {connectField('description', {
                        label: 'Description',
                        rows: 4,
                        required: true,
                      })(TextArea)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12">
                      {connectField('company', {
                        options: companies,
                        required: true,
                        label: 'Company',
                      })(SelectOption)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12">
                      {connectField('forCourse', {
                        label: 'For courses',
                        required: true,
                        options: courses,
                      })(SelectOption)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12">
                      {connectField('forDept', {
                        options: departments,
                        required: true,
                        label: 'For Departments',
                      })(SelectOption)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12 col-sm-6">
                      {connectField('academicGap', {
                        className: 'form-control',
                        label: 'Max Academic gap',
                      })(Input)}
                    </div>
                    <div className="col-12 col-sm-6">
                      {connectField('maxBacklogs', {
                        required: true,
                        className: 'form-control',
                        label: 'Max Backlogs Allowed',
                      })(Input)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12 col-sm-6">
                      {connectField('minSalary', {
                        className: 'form-control',
                        label: 'Min salary',
                      })(Input)}
                    </div>
                    <div className="col-12 col-sm-6">
                      {connectField('maxSalary', {
                        className: 'form-control',
                        label: 'Max salary',
                      })(Input)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <h6 className="col-12 text-muted my-2">Rounds</h6>

                <div className="col-12">
                  {[...Array(numOfRounds)].map((_, index) => {
                    return (
                      <div className="row px-sm-4 py-2" key={index.toString()}>
                        <div className="col-12 col-sm-6">
                          {connectField(`round_${index}_name`, {
                            className: 'form-control',
                            label: `Round ${index + 1} Name`,
                          })(Input)}
                        </div>
                        <div className="col-12 col-sm-6">
                          {connectField(`round_${index}_description`, {
                            className: 'form-control',
                            label: `Round ${index + 1} Description`,
                          })(Input)}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="col-12">
                  <div className="px-sm-4 py-2">
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
                </div>
              </div>
              <Button
                className="btn btn-block btn-primary"
                type="submit"
                text="Add Job"
                loading={submitting}
              />
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default JobForm;

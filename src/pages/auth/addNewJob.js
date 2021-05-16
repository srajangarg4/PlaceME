import React from 'react';
import { useState } from 'react';
import {
  Button,
  Card,
  Input,
  Navbar,
  TextArea,
  SelectOption,
} from '../../components';
import { useFormReducer } from '../../hooks';
import { required } from '../../utils';

const validators = {
  company: [required('Company name is required')],
  minSalary: [required('min salary is required')],
  maxSalary: [required('max salary is required')],
};

const AddNewJob = () => {
  const { connectField, handleSubmit } = useFormReducer(validators);
  const [rounds, setRounds] = useState([]);
  const addRoundOnClick = () => {
    setRounds([
      ...rounds,
      {
        name: '',
        description: '',
      },
    ]);
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <Card>
          <div className="card-header">
            <h4 className="text-center">Add New Job</h4>
          </div>
          <div className="card-body">
            <form>
              <div className="row my-3">
                <h6 className="col-12 text-muted my-2">Title & Description</h6>
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12">
                      {connectField('title', {
                        className: 'form-control',
                        placeholder: 'Title',
                      })(Input)}
                    </div>
                    <div className="col-12">
                      {connectField('jobDescription', {
                        className: 'form-control',
                        placeholder: 'Description',
                        rows: 4,
                      })(TextArea)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <h6 className="col-12 text-muted my-2">For Courses</h6>
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12">
                      <SelectOption
                        multiple
                        options={[
                          { value: 'BTech.', text: 'B.Tech.' },
                          { value: 'MTech.', text: 'M.Tech.' },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <h6 className="col-12 text-muted my-2">For Departments</h6>
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12">
                      <SelectOption
                        multiple
                        options={[
                          {
                            value: 'CSE',
                            text: 'Computer Science and Engineering',
                          },
                          { value: 'CIVIL', text: 'Civil Engineering' },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <h6 className="col-12 text-muted my-2">
                  Academic Gaps & Backlogs
                </h6>
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12 col-sm-6">
                      {connectField('maxAcademicGap', {
                        className: 'form-control',
                        placeholder: 'Max Academic gap',
                      })(Input)}
                    </div>
                    <div className="col-12 col-sm-6">
                      {connectField('maxBacklogs', {
                        className: 'form-control',
                        placeholder: 'Max Backlogs Allowed',
                      })(Input)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <h6 className="col-12 text-muted my-2">Salary</h6>
                <div className="col-12">
                  <div className="px-sm-4 py-2 row">
                    <div className="col-12 col-sm-6">
                      {connectField('minSalary', {
                        className: 'form-control',
                        placeholder: 'Min salary',
                      })(Input)}
                    </div>
                    <div className="col-12 col-sm-6">
                      {connectField('maxSalary', {
                        className: 'form-control',
                        placeholder: 'Max salary',
                      })(Input)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <h6 className="col-12 text-muted my-2">Rounds</h6>
                {rounds.length !== 0 && (
                  <div className="col-12">
                    {rounds.map((round, index) => {
                      return (
                        <div className="row px-sm-4 py-2">
                          <div className="col-12 col-sm-6">
                            {connectField(`round ${index + 1}`, {
                              className: 'form-control',
                              placeholder: `Round ${index + 1} Name`,
                            })(Input)}
                          </div>
                          <div className="col-12 col-sm-6">
                            {connectField(`round ${index + 1}`, {
                              className: 'form-control',
                              placeholder: `Round ${index + 1} Description`,
                            })(Input)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="col-12">
                  <div className="px-sm-4 py-2">
                    <button
                      className="btn btn-outline-secondary d-flex align-items-center"
                      type="button"
                      onClick={() => addRoundOnClick()}
                    >
                      <span className="material-icons">add</span> Add Round
                    </button>
                  </div>
                </div>
              </div>
              <button className="btn btn-block btn-primary" type="submit">
                Add Job
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddNewJob;

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
                <h6 className="col-12 text-muted my-2">Salary</h6>
                <div className="col-12">
                  <div className="px-4 py-2 row">
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
              <div className="row my-3">
                <h6 className="col-12 text-muted my-2">Salary</h6>
                <div className="col-12">
                  <div className="px-4 py-2 row">
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
                <div className="d-flex col-12 justify-content-between align-items-center my-2">
                  <h6 className="text-muted">Rounds</h6>
                  <button
                    type="button"
                    className="btn-sm btn-primary"
                    onClick={() => addRoundOnClick()}
                  >
                    Add Round
                  </button>
                </div>
                {rounds.length !== 0 && (
                  <div className="col-12">
                    {rounds.map((round, index) => {
                      return (
                        <div className="row px-4">
                          <div className="col-12 col-sm-6">
                            {connectField(`round${index}`, {
                              className: 'form-control',
                              placeholder: `round${index} name`,
                            })(Input)}
                          </div>
                          <div className="col-12 col-sm-6">
                            {connectField(`round${index}`, {
                              className: 'form-control',
                              placeholder: `round${index} description`,
                            })(Input)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                <SelectOption
                  options={[
                    { value: '123', text: '123' },
                    { value: '1234', text: '223232' },
                  ]}
                  onChange={(val) => console.log(val.target.value)}
                />
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AddNewJob;

import { useDatabase, useFormReducer } from 'hooks';
import React from 'react';
import { Navbar, Card, Input, Button } from 'components';
import { required } from 'utils';
import { addDepartment } from 'middleware';
import { addDepartment as addDepartmentAction } from 'actions';

const validators = {
  name: [required('Name is required to continue.')],
  abbrivation: [required('Abbrivation is required to continue')],
  hodEmail: [required('Hod Email is required')],
};

const AddDepartment = () => {
  const { loading, callDatabase } = useDatabase(addDepartment);
  const { connectField, handleSubmit, submitting } = useFormReducer(validators);
  return (
    <div>
      <Navbar />
      <div className="container">
        <Card shadow>
          <div className="card-header">
            <h4 className="text-center">Add New Department</h4>
          </div>
          <div className="card-body">
            <form
              onSubmit={handleSubmit((data) => {
                console.log(data);
                callDatabase(
                  (result) => {
                    addDepartmentAction(result);
                  },
                  (error) => console.log(error),
                  data,
                );
              })}
            >
              <div className="row">
                <div className="col-12 px-sm-5 py-2">
                  {connectField('name', {
                    label: 'Department Name',
                    required: true,
                  })(Input)}
                </div>
                <div className="col-12 px-sm-5 py-2">
                  {connectField('abbrivation', {
                    label: 'Department Abbrivation',
                    required: true,
                  })(Input)}
                </div>
                <div className="col-12 px-sm-5 py-2">
                  {connectField('hodEmail', {
                    label: 'HOD Email ID',
                    type: 'email',
                    required: true,
                  })(Input)}
                </div>
                <div className="col-12 mt-2 px-sm-5 py-2">
                  <Button
                    className="btn btn-block btn-primary"
                    type="submit"
                    text="Add Job"
                    loading={loading || submitting}
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

export default AddDepartment;

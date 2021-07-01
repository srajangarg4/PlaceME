import { useDatabase, useFormReducer } from 'hooks';
import React, { useEffect, useState } from 'react';
import { Navbar, Card, Input, Button, Loader } from 'components';
import { required, validateEmail } from 'utils';
import { addDepartment, fetchDepartment } from 'middleware';
import { addDepartment as addDepartmentAction } from 'actions';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { showError, showSuccess } from 'components/toast';

const validators = {
  name: [required('Name is required to continue.')],
  abbrivation: [required('Abbrivation is required to continue')],
  hodEmail: [required('Hod Email is required'), validateEmail],
};

const DepartmentDetail = () => {
  const { id } = useParams();
  const { departments } = useSelector((state) => state.department);
  const [isEditing, setIsEditing] = useState(false);
  const { loading, callDatabase: getDepartment } = useDatabase(
    fetchDepartment,
    !departments[id],
  );
  const { loading: isUpdating, callDatabase: updateDepartment } =
    useDatabase(addDepartment);
  const { connectField, handleSubmit, submitting, change } =
    useFormReducer(validators);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!departments[id]) {
      getDepartment(
        (result) => {
          dispatch(addDepartmentAction(result));
        },
        showError,
        id,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const defaultValues = departments[id] ?? {};
    Object.keys(defaultValues).forEach((key) =>
      change(key, defaultValues[key]),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departments, id]);

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-10">
            <Card shadow>
              <div className="card-header p-4 d-flex justify-content-between align-items-center">
                <h4 className="m-0">Department</h4>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="edit"
                    disabled={loading || isUpdating}
                    checked={isEditing}
                    onChange={() => setIsEditing(!isEditing)}
                  />
                  <label className="custom-control-label" htmlFor="edit">
                    Edit
                  </label>
                </div>
              </div>
              <div className="card-body">
                {loading ? (
                  <Loader />
                ) : (
                  <form
                    onSubmit={handleSubmit((data) => {
                      updateDepartment(
                        (result) => {
                          dispatch(addDepartmentAction(result));
                          showSuccess('Department Updated Successfully');
                          setIsEditing(false);
                        },
                        showError,
                        data,
                      );
                    })}
                  >
                    <div className="row">
                      <div className="col-12 px-sm-5 py-2">
                        {connectField('name', {
                          label: 'Department Name',
                          required: true,
                          disabled: !isEditing,
                        })(Input)}
                      </div>
                      <div className="col-12 px-sm-5 py-2">
                        {connectField('abbrivation', {
                          label: 'Department Abbrivation',
                          required: true,
                          disabled: true,
                        })(Input)}
                      </div>
                      <div className="col-12 px-sm-5 py-2">
                        {connectField('hodEmail', {
                          label: 'HOD Email ID',
                          type: 'email',
                          required: true,
                          disabled: !isEditing,
                        })(Input)}
                      </div>
                      {isEditing && (
                        <div className="col-12 mt-2 px-sm-5 py-2">
                          <Button
                            className="btn btn-block btn-primary"
                            type="submit"
                            text={isEditing ? 'Edit Department' : 'Add Job'}
                            loading={isUpdating || submitting}
                          />
                        </div>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;

import { companyTypes } from 'assets';
import { Button, Card, Input, SelectOption } from 'components';
import { useFormReducer } from 'hooks';
import React, { useCallback, useState } from 'react';
import { required, unflatten } from 'utils';

const validators = {
  name: [required('Please enter a name.')],
  type: [required('Please provide company type')],
};

const CompanyForm = ({ title, defaultValues }) => {
  const { connectField, addField, handleSubmit, submitting } =
    useFormReducer(validators);

  const addRepersentatives = useCallback(
    (index) => {
      addField(`repersentative_${index}_name`, [required('Please enter name')]);
      addField(`repersentative_${index}_email`, [
        required('Please enter a email'),
      ]);
      addField(`repersentative_${index}_mobile`, [
        required('Please enter mobile number'),
      ]);
    },
    [addField],
  );

  const [numOfReps, setNumOfReps] = useState(0);

  return (
    <Card className="container bg-primary p-5">
      <p className="display-4 text-center">{title}</p>
      {/* <hr /> */}
      <div className="row mt-3">
        <div className="col-12">
          {connectField('name', {
            label: 'Name',
            required: true,
          })(Input)}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {connectField('type', {
            label: 'Type',
            options: companyTypes,
            required: true,
          })(SelectOption)}
        </div>
      </div>
      <p className="text-muted">Repersentatives</p>
      {[...Array(numOfReps)].map((_, index) => (
        <div className="row" key={index.toString()}>
          <div className="col-4">
            {connectField(`repersentative_${index}_name`, {
              label: 'Name',
              required: true,
            })(Input)}
          </div>
          <div className="col-4">
            {connectField(`repersentative_${index}_email`, {
              label: 'Email',
              required: true,
            })(Input)}
          </div>
          <div className="col-4">
            {connectField(`repersentative_${index}_mobile`, {
              label: 'Mobile',
              required: true,
            })(Input)}
          </div>
        </div>
      ))}
      <div className="row">
        <div className="col-12">
          <Button
            text="Add Repersentative"
            onClick={() => {
              addRepersentatives(numOfReps);
              setNumOfReps(numOfReps + 1);
            }}
            buttonClassName="btn btn-outline-secondary"
          />
        </div>
      </div>

      <div className="row d-flex justify-content-center mt-4">
        <Button
          text="Submit"
          loading={submitting}
          onClick={handleSubmit((data) => {
            console.log('Data', unflatten(data));
          })}
        />
      </div>
    </Card>
  );
};

CompanyForm.defaultProps = {
  title: 'Add new company',
};

export default CompanyForm;

import { companyTypes } from 'assets';
import { Button, Card, Input, SelectOption } from 'components';
import { useFormReducer } from 'hooks';
import React, { useCallback, useState } from 'react';
import { required, unflatten } from 'utils';

const validators = {
  name: [],
  type: [],
};

const CompanyForm = ({ title, defaultValues }) => {
  const { connectField, addField, handleSubmit } = useFormReducer(validators);

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
    <Card className="container bg-primary">
      <p className="display-4 text-center">{title}</p>
      <div className="row">
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
      <p>Repersentatives</p>
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
        <Button
          text="add"
          onClick={() => {
            addRepersentatives(numOfReps);
            setNumOfReps(numOfReps + 1);
          }}
        />
        <Button
          text="Submit"
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

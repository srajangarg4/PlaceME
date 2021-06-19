import React, { useCallback, useState } from 'react';
import { companyTypes } from 'assets';
import { Button, Card, Input, SelectOption, File } from 'components';
import { useDatabase, useFormReducer } from 'hooks';
import { required, unflatten, validateURL } from 'utils';
import { addNewCompany } from 'middleware';

const validators = {
  name: [required('Please enter a name.')],
  type: [required('Please provide company type')],
  repersentative_0_name: [required('Please enter name')],
  repersentative_0_email: [required('Please enter a email')],
  repersentative_0_mobile: [required('Please enter mobile number')],
  logo: [required('Please select a logo.')],
  website: [required('Please enter website.'), validateURL],
  otherDetails: [],
};

const CompanyForm = ({ title, defaultValues }) => {
  const { connectField, addField, handleSubmit, submitting } = useFormReducer(
    validators,
    defaultValues,
  );
  const { loading, callDatabase } = useDatabase(addNewCompany);

  const handleFormSumit = handleSubmit((data) => {
    console.log(unflatten(data));
    // callDatabase(
    //   (result) => console.log(result),
    //   (error) => console.log(error),
    //   unflatten(data),
    // );
  });

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

  const [numOfReps, setNumOfReps] = useState(1);

  return (
    <Card className="container p-5" shadow>
      <p className="display-4 text-center">{title}</p>
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
      <div className="row">
        <div className="col-12">
          {connectField('logo', {
            label: 'Logo',
            required: true,
          })(File)}
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          {connectField('website', {
            label: 'Website',
            type: 'url',
            required: true,
          })(Input)}
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
          fullWidth
          loading={submitting}
          onClick={handleFormSumit}
        />
      </div>
    </Card>
  );
};

CompanyForm.defaultProps = {
  title: 'Add new company',
};

export default CompanyForm;

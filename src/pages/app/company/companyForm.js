import React, { useCallback, useState } from 'react';
import { companyTypes } from 'assets';
import {
  Button,
  Card,
  Input,
  SelectOption,
  File,
  TextArea,
  Navbar,
} from 'components';
import { useDatabase, useFormReducer } from 'hooks';
import {
  required,
  Routes,
  unflatten,
  validateEmail,
  validateFirstName,
  validatePhoneNumber,
  validateURL,
} from 'utils';
import { addNewCompany } from 'middleware';
import { useDispatch } from 'react-redux';
import { addCompany } from 'actions';
import { useHistory } from 'react-router-dom';
import { showError, showSuccess } from 'components/toast';

const validators = {
  name: [required('Please enter a name.')],
  type: [required('Please provide company type')],
  representatives_0_name: [required('Please enter name')],
  representatives_0_email: [required('Please enter a email'), validateEmail],
  representatives_0_mobile: [
    required('Please enter mobile number'),
    validatePhoneNumber,
  ],
  logo: [required('Please select a logo.')],
  website: [required('Please enter website.'), validateURL],
  otherDetails: [],
};

const CompanyForm = ({ title, defaultValues }) => {
  const { connectField, addField, handleSubmit } = useFormReducer(
    validators,
    defaultValues,
  );
  const { loading, callDatabase } = useDatabase(addNewCompany);
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleFormSumit = handleSubmit((data) => {
    callDatabase(
      (result) => {
        dispatch(addCompany(result));
        showSuccess('Company created successfully');
        push(`${Routes.companyDetails.path}${result?.id}`);
      },
      showError,
      unflatten(data),
    );
  });

  const addRepersentatives = useCallback(
    (index) => {
      addField(`representatives_${index}_name`, [
        required('Please enter name'),
        validateFirstName,
      ]);
      addField(`representatives_${index}_email`, [
        required('Please enter a email'),
        validateEmail,
      ]);
      addField(`representatives_${index}_mobile`, [
        required('Please enter mobile number'),
        validatePhoneNumber,
      ]);
    },
    [addField],
  );

  const [numOfReps, setNumOfReps] = useState(1);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-10">
            <Card shadow>
              <div className="card-header p-4">
                <h4 className="text-center">Add New Company</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    {connectField('name', {
                      label: 'Name',
                      required: true,
                    })(Input)}
                  </div>
                  <div className="col-12">
                    {connectField('type', {
                      label: 'Type',
                      options: companyTypes,
                      required: true,
                    })(SelectOption)}
                  </div>
                  <div className="col-12">
                    {connectField('logo', {
                      label: 'Logo',
                      required: true,
                    })(File)}
                  </div>
                  <div className="col-12">
                    {connectField('website', {
                      label: 'Website',
                      type: 'url',
                      required: true,
                    })(Input)}
                  </div>
                  <div className="col-12">
                    {connectField('otherDetails', {
                      label: 'Other Details',
                      rows: 5,
                    })(TextArea)}
                  </div>
                </div>
                <p className="text-muted">Repersentatives</p>
                {[...Array(numOfReps)].map((_, index) => (
                  <div className="row" key={index.toString()}>
                    <div className="col-4">
                      {connectField(`representatives_${index}_name`, {
                        label: 'Name',
                        required: true,
                      })(Input)}
                    </div>
                    <div className="col-4">
                      {connectField(`representatives_${index}_email`, {
                        label: 'Email',
                        required: true,
                      })(Input)}
                    </div>
                    <div className="col-4">
                      {connectField(`representatives_${index}_mobile`, {
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
                    loading={loading}
                    onClick={handleFormSumit}
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

CompanyForm.defaultProps = {
  title: 'Add new company',
};

export default CompanyForm;

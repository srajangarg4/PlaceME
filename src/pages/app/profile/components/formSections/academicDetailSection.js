import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Input } from '../../../../../components';
import { useFormReducer } from '../../../../../hooks';
import { required } from '../../../../../utils';

const validators = {
  board12: [required('Board is required')],
  schoolName12: [required('School Name is required')],
  percentage12: [required('Percentage is required')],
  marksheet12: [],
  board10: [required('Board is required')],
  schoolName10: [required('School Name is required')],
  percentage10: [required('Percentage is required')],
  marksheet10: [],
  rollNumber: [],
  department: [],
  startingYear: [],
  passingYear: [],
};

const getDefaultValues = (academicDetail) => ({
  board12: academicDetail?.seniorSecondary?.board ?? '',
  schoolName12: academicDetail?.seniorSecondary?.schoolName ?? '',
  percentage12: academicDetail?.seniorSecondary?.percentage ?? '',
  marksheet12: academicDetail?.seniorSecondary?.marksheet ?? '',
  board10: academicDetail?.secondary?.board ?? '',
  schoolName10: academicDetail?.secondary?.schoolName ?? '',
  percentage10: academicDetail?.secondary?.percentage ?? '',
  marksheet10: academicDetail?.secondary?.marksheet ?? '',
  rollNumber: academicDetail?.gradutation?.rollNumber ?? '',
  department: academicDetail?.gradutation?.department ?? '',
});

const AcademicDetailSection = ({ isFormEditable }) => {
  const academicDetail = useSelector(
    (state) => state?.academicDetail?.[state.user?.email],
  );
  const { connectField, handleSubmit, change } = useFormReducer(validators);

  useEffect(() => {
    const values = getDefaultValues(academicDetail);
    Object.keys(values).forEach((key) => {
      change(key, values[key]);
    });
  }, [academicDetail, change]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <h4 className="text-muted text-center pb-4">Academic Details</h4>
      <div className="py-4 px-md-4">
        <div className="row">
          <h6 className="col-12 py-3 text-muted">Senior Secondary</h6>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="board-12-field" className="text-muted">
                Board
              </label>
              {connectField('board12', {
                id: 'board-12-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="school-name-12-field" className="text-muted">
                School Name
              </label>
              {connectField('schoolName12', {
                id: 'school-name-12-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="percentage-12-field" className="text-muted">
                Percentage
              </label>
              {connectField('percentage12', {
                id: 'percentage-12-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="marksheet-12-field" className="text-muted">
                Marksheet
              </label>
              {connectField('marksheet12', {
                id: 'marksheet-12-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <h6 className="col-12 py-3 text-muted">Secondary</h6>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="board-10-field" className="text-muted">
                Board
              </label>
              {connectField('board10', {
                id: 'board-10-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="school-name-10-field" className="text-muted">
                School Name
              </label>
              {connectField('schoolName10', {
                id: 'school-name-10-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="percentage-10-field" className="text-muted">
                Percentage
              </label>
              {connectField('percentage10', {
                id: 'percentage-10-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="marksheet-10-field" className="text-muted">
                Marksheet
              </label>
              {connectField('marksheet10', {
                id: 'marksheet-10-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <h6 className="col-12 py-3 text-muted">Graduation</h6>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="marksheet-10-field" className="text-muted">
                Roll Number
              </label>
              {connectField('marksheet10', {
                id: 'marksheet-10-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="marksheet-10-field" className="text-muted">
                Department
              </label>
              {connectField('marksheet10', {
                id: 'marksheet-10-field',
                className: 'form-control',
                disabled: !isFormEditable,
              })(Input)}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AcademicDetailSection;

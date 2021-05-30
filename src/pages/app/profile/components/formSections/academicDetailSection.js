import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input, File } from '../../../../../components';
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
  semesters: [],

  academicGap: [],
};

const mapToAcademicDetail = (formData) => ({
  academicGap: formData.academicGap,
  seniorSecondary: {
    board: formData.board12,
    schoolName: formData.schoolName12,
    percentage: formData.percentage12,
    marksheet: formData.marksheet12,
  },
  secondary: {
    board: formData.board10,
    schoolName: formData.schoolName10,
    percentage: formData.percentage10,
    marksheet: formData.marksheet10,
  },
  graduation: {
    batch: {
      passingYear: formData.passingYear,
      startingYear: formData.passingYear,
    },
    department: formData.department,
    rollNumber: formData.rollNumber,
    semesters: formData.semesters,
  },
});

const getDefaultValues = (academicDetail) => ({
  board12: academicDetail?.seniorSecondary?.board ?? '',
  schoolName12: academicDetail?.seniorSecondary?.schoolName ?? '',
  percentage12: academicDetail?.seniorSecondary?.percentage ?? '',
  marksheet12: academicDetail?.seniorSecondary?.marksheet ?? '',
  board10: academicDetail?.secondary?.board ?? '',
  schoolName10: academicDetail?.secondary?.schoolName ?? '',
  percentage10: academicDetail?.secondary?.percentage ?? '',
  marksheet10: academicDetail?.secondary?.marksheet ?? '',
  rollNumber: academicDetail?.graduation?.rollNumber ?? '',
  department: academicDetail?.graduation?.department ?? '',
});

const AcademicDetailSection = ({ isFormEditable }) => {
  const academicDetail = useSelector(
    (state) => state?.academicDetail?.[state.user?.email],
  );

  const [semesters, setSemester] = useState();

  const { connectField, handleSubmit, change } = useFormReducer(validators);

  useEffect(() => {
    const values = getDefaultValues(academicDetail);
    Object.keys(values).forEach((key) => {
      change(key, values[key]);
    });
    setSemester(academicDetail?.graduation?.semesters);
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
            {connectField('board12', {
              id: 'board-12-field',
              label: 'Board',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('schoolName12', {
              id: 'school-name-12-field',
              label: 'School Name',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('percentage12', {
              id: 'percentage-12-field',
              label: ' Percentage',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('marksheet12', {
              id: 'marksheet-12-field',
              label: 'Marksheet',
              disabled: !isFormEditable,
            })(File)}
          </div>
          <h6 className="col-12 py-3 text-muted">Secondary</h6>
          <div className="col-12 col-md-6">
            {connectField('board10', {
              id: 'board-10-field',
              label: 'Board',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('schoolName10', {
              id: 'school-name-10-field',
              label: ' School Name',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('percentage10', {
              id: 'percentage-10-field',
              label: 'Percentage',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('marksheet10', {
              id: 'marksheet-10-field',
              label: 'Marksheet',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <h6 className="col-12 py-3 text-muted">Graduation</h6>
          <div className="col-12 col-md-6">
            {connectField('marksheet10', {
              id: 'marksheet-10-field',
              label: 'Roll Number',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('marksheet10', {
              type: 'file',
              id: 'marksheet-10-field',
              label: 'Department',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12">
            {semesters?.map(({ activeBacklogs, percentage }, index) => (
              <div className="row" key={index.toString()}>
                <h6 className="col-12 py-3 text-muted">Semester {index + 1}</h6>
                <div className="col-12 col-md-6">
                  <Input
                    disabled={!isFormEditable}
                    onChange={(text) =>
                      change(`activeBacklog${index + 1}`, text)
                    }
                    label="Active Backlogs"
                  />
                </div>
                <div className="col-12 col-md-6">
                  <Input
                    disabled={!isFormEditable}
                    onChange={(text) => change(`percentage${index + 1}`, text)}
                    label="Percentage"
                  />
                </div>
                <div className="col-12">
                  <File
                    disabled={!isFormEditable}
                    onChange={(file) => change(`marksheet${index + 1}`, file)}
                    label="Marksheet"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {isFormEditable && (
          <Button type="submit" fullWidth text="Send for Update" />
        )}
      </div>
    </form>
  );
};

export default AcademicDetailSection;

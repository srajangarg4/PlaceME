import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Input } from 'components';
import { useFormReducer } from 'hooks';
import { flattenObject, getDifference, required, unflatten } from 'utils';
import { PendingRequestService } from 'placeme-services/lib';

const validators = {
  academicGap: [],

  graduation_rollNumber: [],
  graduation_department: [],
  graduation_course: [],
  graduation_batch_startingYear: [],
  graduation_batch_passingYear: [],

  secondary_board: [required('Board is required')],
  secondary_percentage: [required('School Name is required')],
  secondary_schoolName: [required('Percentage is required')],

  seniorSecondary_board: [required('Board is required')],
  seniorSecondary_percentage: [required('School Name is required')],
  seniorSecondary_schoolName: [required('Percentage is required')],
};

const AcademicDetailSection = ({ isFormEditable, setIsFormEditable }) => {
  const academicDetail = useSelector(
    (state) => state?.academicDetail?.[state.user?.email],
  );

  const [semesters, setSemester] = useState(0);

  const { connectField, handleSubmit, change, addField, submitting } =
    useFormReducer(validators);

  const addSemesterField = useCallback(
    (index, data) => {
      const percentage = data?.percentage;
      const activeBacklogs = data?.activeBacklogs;
      addField(
        `graduation_semesters_${index}_percentage`,
        [required('This is required')],
        percentage,
      );
      addField(
        `graduation_semesters_${index}_activeBacklogs`,
        [required('This is required')],
        activeBacklogs,
      );
    },
    [addField],
  );

  useEffect(() => {
    const values = flattenObject(academicDetail);
    Object.keys(values).forEach((key) => {
      change(key, values[key]);
    });

    setSemester(academicDetail?.graduation?.semesters.length);
    const size = academicDetail?.graduation?.semesters?.length;
    let i = 0;
    while (i < size) {
      addSemesterField(i, academicDetail?.graduation?.semesters[i]);
      i++;
    }
  }, [academicDetail, addSemesterField, change]);

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const changes = getDifference(academicDetail, unflatten(data));
        const updateRequest = new PendingRequestService();

        if (changes !== null) {
          let title = '';
          let comment = '';

          title = prompt('Enter a message for this update');
          comment = prompt('Enter a comment');
          console.log('Title obtained', title);
          if (title && comment) {
            const { successful, error } = await updateRequest.add({
              updatesRequired: changes,
              title,
              type: 'ACADEMICS',
              comment,
            });

            if (successful) {
              console.log('Sucessful');
              setIsFormEditable(false);
            } else {
              console.log('Erorr', error);
            }
          }
        } else {
          alert('No modification done.');
        }
      })}
    >
      <h4 className="text-muted text-center pb-4">Academic Details</h4>
      <div className="py-4 px-md-4">
        <div className="row">
          <h6 className="col-12 py-3 text-muted">Senior Secondary</h6>
          <div className="col-12 col-md-6">
            {connectField('seniorSecondary_board', {
              label: 'Board',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('seniorSecondary_percentage', {
              label: ' Percentage',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12">
            {connectField('seniorSecondary_schoolName', {
              label: 'School Name',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <h6 className="col-12 py-3 text-muted">Secondary</h6>
          <div className="col-12 col-md-6">
            {connectField('secondary_board', {
              label: 'Board',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('secondary_percentage', {
              label: 'Percentage',
              disabled: !isFormEditable,
            })(Input)}
          </div>

          <div className="col-12">
            {connectField('secondary_schoolName', {
              label: ' School Name',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <h6 className="col-12 py-3 text-muted">Graduation</h6>
          <div className="col-12 col-md-6">
            {connectField('graduation_rollNumber', {
              label: 'Roll Number',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12 col-md-6">
            {connectField('graduation_department', {
              required: true,
              label: 'Department',
              disabled: !isFormEditable,
            })(Input)}
          </div>
          <div className="col-12">
            {[...Array(semesters)]?.map((_, index) => (
              <div className="row" key={index.toString()}>
                <h6 className="col-12 py-3 text-muted">Semester {index + 1}</h6>

                <div className="col-12 col-md-6">
                  {connectField(`graduation_semesters_${index}_percentage`, {
                    disabled: !isFormEditable,
                    label: 'Percentage',
                  })(Input)}
                </div>
                <div className="col-12 col-md-6">
                  {connectField(
                    `graduation_semesters_${index}_activeBacklogs`,
                    {
                      disabled: !isFormEditable,
                      label: 'Active Backlogs',
                    },
                  )(Input)}
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 d-flex">
            <Button
              buttonClassName="btn-outline-dark btn-sm ml-auto"
              disabled={!isFormEditable}
              text="Add Semester"
              onClick={() => {
                setSemester(semesters + 1);
                addSemesterField(semesters);
              }}
            />
          </div>
        </div>
        <div className="row d-flex justify-content-end my-3 mx-0"></div>
        {isFormEditable && (
          <Button
            type="submit"
            fullWidth
            text="Send for Update"
            loading={submitting}
          />
        )}
      </div>
    </form>
  );
};

export default AcademicDetailSection;

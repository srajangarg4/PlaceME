import React from 'react';
import { Link } from 'react-router-dom';
import { Role, Routes } from 'utils';
import { Button, Card } from 'components';
import { useSelector } from 'react-redux';
import { useDatabase } from 'hooks';
import { applyForJob } from 'middleware/jobApplication';
import { showError, showSuccess } from 'components/toast';

const JobCard = ({ job, company, id, onClick }) => {
  const user = useSelector((state) => state.user);
  const { loading, callDatabase } = useDatabase(applyForJob);
  const { logo, name } = company ?? {};
  const { title, location, jobType } = job ?? {};
  return (
    <Card>
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-md">
            <div className="row align-items-center">
              {logo && (
                <div className="col-12 col-md-2 p-2 p-sm-3 mr-3 mr-sm-5">
                  <img
                    height={48}
                    width={46}
                    src={logo?.url}
                    className="mx-auto d-block"
                    alt=""
                  />
                </div>
              )}
              <div className="col-12 col-md">
                <h3 className="text-capitalize">{title}</h3>
                {name && <h6 className="text-capitalize">{name}</h6>}
                <div className="row">
                  <div className="col-auto my-1">
                    <i className="text-muted d-flex align-items-center">
                      <span className="material-icons">place</span>
                      {location}
                    </i>
                  </div>
                  <div className="col-auto my-1">
                    <i className="text-muted d-flex align-items-center">
                      <span className="material-icons">schedule</span>
                      {jobType}
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-auto d-flex align-items-center my-3">
            {onClick ? (
              user?.role === Role.STUDENT ? (
                <Button
                  text="Apply"
                  loading={loading}
                  buttonClassName="btn btn-block btn-outline-dark"
                  onClick={() => {
                    callDatabase(
                      () =>
                        showSuccess('You have suceesfully applied for the job'),
                      showError,
                      id,
                    );
                  }}
                />
              ) : (
                <Link
                  className="btn btn-block btn-outline-dark"
                  to={Routes.updateJob.path + id}
                >
                  Edit
                </Link>
              )
            ) : (
              <Link
                className="btn btn-block btn-outline-dark"
                to={Routes.jobDetail.path + id}
              >
                View
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;

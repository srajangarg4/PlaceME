import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from 'utils';

const JobTitleCard = ({
  job: { title, location, jobType } = {},
  photoUrl,
  id,
}) => {
  return (
    <div className="card shadow bg-white my-4">
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-md">
            <div className="d-flex align-items-center">
              <div className="p-2 p-sm-3 mr-3 mr-sm-5">
                <img height={48} width={46} src={"https://preview.colorlib.com/theme/jobsco/assets/img/icon/1.svg"} alt="" />
              </div>
              <div>
                <h3 className="text-capitalize">{title}</h3>
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
            <Link
              className="btn btn-block btn-outline-dark"
              to={`${Routes.jobDetailsBase.path}${id}`}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobTitleCard;

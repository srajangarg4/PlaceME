import React, { useEffect } from 'react';
import { Card, Navbar, Loader, Toast } from '../../../components';
import { useDatabase } from '../../../hooks';
import { JobService, CompanyService } from 'placeme-services/lib';
import { useSelector, useDispatch } from 'react-redux';
import { addJobs, addCompanies } from '../../../actions';
import { Link } from 'react-router-dom';
import { Routes } from '../../../utils';

const fetchCompaniesAndJobs = async () => {
  const jobService = new JobService();
  const companyService = new CompanyService();
  const jobResult = await jobService.getAll();
  const companyResult = await companyService.getAll();
  return {
    successful: jobResult.successful && companyResult.successful,
    result: { jobs: jobResult.result, companies: companyResult.result },
    error: jobResult.error ?? companyResult.error,
  };
};

const AllJobs = () => {
  const { loading, errors, callDatabase } = useDatabase(fetchCompaniesAndJobs);
  const { jobs, hasAlreadyFetchedJobs } = useSelector((state) => state.job);
  const { companies, hasAlreadyFetchedCompanies } = useSelector(
    (state) => state.company,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!hasAlreadyFetchedJobs || !hasAlreadyFetchedCompanies) {
      callDatabase((data) => {
        const { jobs, companies } = data;
        dispatch(addCompanies(companies));
        dispatch(addJobs(jobs));
      });
    }
  }, []);

  return (
    <div>
      <Toast show={!!errors} />
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-4 my-sm-5">
            <Card>
              <div className="card-body">
                <h5 className="text-center pt-3 pb-1">Job Filters</h5>
                <hr />
                <ul className="list-unstyled">
                  <li></li>
                </ul>
              </div>
            </Card>
          </div>
          <div className="col-12 col-sm">
            <Card>
              <div className="card-header bg-white">
                <h4 className="text-center pt-3">Jobs</h4>
              </div>
              <div className="card-body mx-3">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <Loader />
                  </div>
                ) : (
                  Object.keys(jobs).map((job) => {
                    return (
                      <JobTitleCard
                        id={job}
                        job={jobs[job]}
                        photoUrl={companies[jobs[job].company].logo}
                        key={job}
                      />
                    );
                  })
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobTitleCard = ({ job: { title, location, jobType }, photoUrl, id }) => {
  return (
    <div className="card shadow bg-white my-4">
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-md">
            <div className="d-flex align-items-center">
              <div className="p-2 p-sm-3 mr-3 mr-sm-5">
                <img height={48} width={46} src={photoUrl} alt="" />
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
              to={`${Routes.jobBase.path}/${id}`}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJobs;

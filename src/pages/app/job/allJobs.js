import React, { useEffect } from 'react';
import { Card, Navbar, Loader, Toast } from 'components';
import { useDatabase } from 'hooks';
import { JobService, CompanyService } from 'placeme-services/lib';
import { useSelector, useDispatch } from 'react-redux';
import { addJobs, addCompanies } from 'actions';
import JobTitleCard from './components/jobDetailCard';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

export default AllJobs;

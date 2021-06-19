import React, { useEffect } from 'react';
import { Card, Navbar, Loader, Toast } from 'components';
import { useDatabase } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { addJobs, addCompanies } from 'actions';
import JobCard from './components/jobCard';
import { fetchCompaniesAndJobs } from 'middleware';

const AllJobs = () => {
  const { jobs, hasAlreadyFetchedJobs } = useSelector((state) => state.job);
  const { companies, hasAlreadyFetchedCompanies } = useSelector(
    (state) => state.company,
  );
  const dispatch = useDispatch();
  const { loading, errors, callDatabase } = useDatabase(
    fetchCompaniesAndJobs,
    !hasAlreadyFetchedJobs || !hasAlreadyFetchedCompanies,
  );

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
            <Card shadow>
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
            <Card shadow>
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
                      <JobCard
                        id={job}
                        job={jobs[job]}
                        company={companies[jobs[job].company]}
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

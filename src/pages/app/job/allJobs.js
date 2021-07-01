import React, { useEffect } from 'react';
import { Card, Navbar, Loader, Badge } from 'components';
import { useDatabase, useFilter } from 'hooks';
import { useSelector, useDispatch } from 'react-redux';
import { addJobs, addCompanies } from 'actions';
import JobCard from './components/jobCard';
import { fetchCompaniesAndJobs } from 'middleware';
import { Role, Routes } from 'utils';
import { Link } from 'react-router-dom';
import { showError } from 'components/toast';

const convertToArray = (data = {}) => Object.keys(data).map((key) => data[key]);

const filters = [
  {
    text: 'By Salary',
    comparator: (a, b) => b?.salary?.max - a?.salary?.max,
  },
  {
    text: 'two',
  },
];

const AllJobs = () => {
  const user = useSelector((state) => state.user);
  const { renderFilters, setInitailData, sortedData } = useFilter(
    null,
    filters,
    Badge,
  );
  const { jobs, hasAlreadyFetchedJobs } = useSelector((state) => state.job);
  const { companies, hasAlreadyFetchedCompanies } = useSelector(
    (state) => state.company,
  );
  const dispatch = useDispatch();
  const { loading, callDatabase } = useDatabase(
    fetchCompaniesAndJobs,
    !hasAlreadyFetchedJobs || !hasAlreadyFetchedCompanies,
  );

  useEffect(() => {
    const arr = convertToArray(jobs);
    setInitailData(arr);
  }, [jobs, setInitailData]);

  useEffect(() => {
    if (!hasAlreadyFetchedJobs || !hasAlreadyFetchedCompanies) {
      callDatabase((data) => {
        const { jobs, companies } = data;
        dispatch(addCompanies(companies));
        dispatch(addJobs(jobs));
      }, showError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-md-10">
            <Card shadow>
              <div className="card-header bg-white">
                {user?.role !== Role.STUDENT ? (
                  <div className="d-flex justify-content-between align-items-center pt-3">
                    <h4 className="text-center">Jobs</h4>
                    <Link
                      className="btn btn-primary"
                      to={Routes.addNewJob.path}
                    >
                      Add Job
                    </Link>
                  </div>
                ) : (
                  <h4 className="text-center pt-3">Jobs</h4>
                )}
              </div>
              <div className="d-flex flex-row flex-nowrap overflow-auto">
                {renderFilters()}
              </div>
              <div className="card-body mx-3">
                {loading ? (
                  <Loader />
                ) : (
                  sortedData?.map((job, index) => {
                    return (
                      <JobCard
                        id={job?.id}
                        job={job}
                        company={companies[job.company]}
                        key={index?.toString()}
                      />
                    );
                  })
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllJobs;

import { addLimitedJobs } from 'actions';
import { Card, Loader } from 'components';
import { useDatabase } from 'hooks';
import { fetchJobs } from 'middleware';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Role, Routes } from 'utils';
import JobCard from './jobCard';

const RecentJobs = () => {
  const { jobs, hasAlreadyFetchedJobs } = useSelector((state) => state.job);
  const { companies } = useSelector((state) => state.company);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { loading, callDatabase } = useDatabase(
    fetchJobs,
    !hasAlreadyFetchedJobs && Object.keys(jobs).length < 3,
  );
  useEffect(() => {
    if (!hasAlreadyFetchedJobs && Object.keys(jobs).length < 3) {
      callDatabase((data) => {
        dispatch(addLimitedJobs(data));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="flex-md-fill" shadow>
      {user?.role === Role.TPO ? (
        <div className="card-header bg-white d-flex justify-content-between align-items-center">
          <h5>Recent Jobs</h5>
          <Link className="btn btn-outline-dark" to={Routes.addNewJob.path}>
            Add Job
          </Link>
        </div>
      ) : (
        <div className="card-header bg-white">
          <h5 className="text-center">Recent Jobs</h5>
        </div>
      )}
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
      <div className="card-footer bg-white">
        <h6 className="text-muted text-center">See More</h6>
      </div>
    </Card>
  );
};

export default RecentJobs;

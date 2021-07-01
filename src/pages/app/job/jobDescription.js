import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addCompany, addJob } from 'actions';
import { Navbar, Card, Loader } from 'components';
import { useDatabase } from 'hooks';
import { JobCard, ManageJobApplication } from './components';
import { fetchJobAndCompanyDetails } from 'middleware';
import { resolveSalary, resolveDate, Role } from 'utils';
import { showError } from 'components/toast';

const JobDescription = () => {
  const { id } = useParams();
  const { jobs } = useSelector((state) => state.job);
  const user = useSelector((state) => state.user);
  const { companies } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  const { loading, callDatabase } = useDatabase(
    () => fetchJobAndCompanyDetails(id, companies, jobs),
    !jobs[id] || !companies[jobs[id]?.company],
  );

  useEffect(() => {
    if (!jobs[id] || !companies[jobs[id]?.company]) {
      callDatabase((jobDetail) => {
        const { job, company } = jobDetail;
        if (company) {
          dispatch(addCompany(company));
        }
        if (job) {
          dispatch(addJob(job));
        }
      }, showError);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar title="PlaceMe" />
      <div className="container">
        {loading ? (
          <Loader />
        ) : (
          <div className="row">
            <div className="col-12 col-md-8">
              <div className="shadow">
                <JobCard
                  id={id}
                  job={jobs[id]}
                  company={companies[jobs[id]?.company]}
                  onClick
                />
              </div>
              <JobDetails description={jobs[id]?.description} />
              {user?.role === Role.TPO && (
                <ManageJobApplication job={jobs[id]} jobId={id} />
              )}
            </div>
            <div className="col-12 col-md">
              <JobSummary {...jobs[id]} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const JobDetails = ({ description }) => {
  return (
    <div className="card shadow bg-white">
      <div className="card-body">
        <h4 className="card-title pt-3 px-1">Job Description</h4>
        <hr className="pt-1 pb-2" />
        <p>{description}</p>
      </div>
    </div>
  );
};

const JobSummary = ({
  postDate,
  salary,
  jobType,
  lastDateToApply,
  maxBacklogs,
  maxAcademicGap,
}) => (
  <Card className="my-5" shadow>
    <div className="card-body">
      <h5 className="text-center pt-3 pb-1">Job Summary</h5>
      <hr />
      <ul style={{ listStyleType: 'circle' }}>
        <ListItem name="Salary" value={resolveSalary(salary)} />
        <ListItem name="Job Type" value={jobType} />
        <ListItem name="Max Backlogs" value={maxBacklogs} />
        <ListItem name="Max Academic gap" value={maxAcademicGap} />
        <ListItem
          name="Apply till"
          value={resolveDate(lastDateToApply).toDateString()}
        />
        <ListItem
          name="Posted on"
          value={resolveDate(postDate).toDateString()}
        />
      </ul>
    </div>
  </Card>
);

const ListItem = ({ name, value }) => {
  return (
    <li className="py-2">
      <span className="text-muted">{name} : </span>
      {value}
    </li>
  );
};

export default JobDescription;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addCompany, addJob } from 'actions';
import { Navbar, Card, Loader } from 'components';
import { useDatabase } from 'hooks';
import JobCard from './components/jobCard';
import { fetchJobAndCompanyDetails } from 'middleware';
import ManageJobApplication from './components/manageJobApplication';

const jobSummaryList = [
  { name: 'Published On', value: 'Date' },
  { name: 'Salary', value: 'Date' },
  { name: 'Location', value: 'Date' },
  { name: 'Job Nature', value: 'Full time' },
  { name: 'Last Date', value: 'Date' },
];

const JobDescription = () => {
  const { id } = useParams();
  const { jobs } = useSelector((state) => state.job);
  const { companies } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  const { loading, callDatabase } = useDatabase(
    () => fetchJobAndCompanyDetails(id, companies, jobs),
    !jobs[id] || !companies[jobs[id]?.company],
  );

  useEffect(() => {
    if (!jobs[id] || !companies[jobs[id]?.company]) {
      callDatabase(
        (jobDetail) => {
          const { job, company } = jobDetail;
          if (company) {
            dispatch(addCompany(company));
          }
          if (job) {
            dispatch(addJob(job));
          }
        },
        (error) => {
          console.error(error);
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Navbar title="PlaceMe" />
      <div className="container">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Loader />
          </div>
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
              <ManageJobApplication job={jobs[id]} jobId={id} />
            </div>
            <div className="col-12 col-md">
              <JobSummary jobSummaryList={jobSummaryList} />
              <JobAnalytics />
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
        <h4 className="card-title py-3 px-1">Job Description</h4>
        <p>{description}</p>
      </div>
    </div>
  );
};

const JobSummary = ({ jobSummaryList }) => (
  <Card className="my-5" shadow>
    <div className="card-body">
      <h5 className="text-center pt-3 pb-1">Job Summary</h5>
      <hr />
      <ul style={{ listStyleType: 'circle' }}>
        {jobSummaryList?.map((item) => (
          <ListItem {...item} key={item.name} />
        ))}
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

const JobAnalytics = () => (
  <Card className="my-5" shadow>
    <div className="card-body">
      <h5 className="text-center pt-3 pb-1">Job Analytics</h5>
      <hr />
      <ul style={{ listStyleType: 'circle' }}>
        <ListItem name="Application Recived" value="10" />
      </ul>
    </div>
  </Card>
);

export default JobDescription;

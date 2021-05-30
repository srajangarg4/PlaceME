import { CompanyService, JobService } from 'placeme-services/lib';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { addCompany, addJob } from '../../../actions';
import { Navbar, Card } from '../../../components';
import { useDatabase } from '../../../hooks';

const jobSummaryList = [
  { name: 'Published On', value: 'Date' },
  { name: 'Salary', value: 'Date' },
  { name: 'Location', value: 'Date' },
  { name: 'Job Nature', value: 'Full time' },
  { name: 'Last Date', value: 'Date' },
];

const fetchJobDetails = async (id, companies) => {
  const jobService = new JobService();
  const jobResult = await jobService.get(id);

  if (!jobResult.successful) {
    return { successful: false, error: jobResult.error };
  }
  const companyId = jobResult.result.data.company;

  if (!companies[companyId]) {
    const companyService = new CompanyService();
    const companyResult = await companyService.get(companyId);
    return {
      successful: companyResult.successful,
      result: { job: jobResult.result, company: companyResult.result },
      error: companyResult.error,
    };
  } else {
    return { successful: true, result: { job: jobResult.result } };
  }
};

const JobDescription = () => {
  const { id } = useParams();
  const { jobs } = useSelector((state) => state.job);
  const { companies } = useSelector((state) => state.company);
  const { callDatabase } = useDatabase(() => fetchJobDetails(id, companies));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!jobs[id]) {
      callDatabase(
        (jobDetail) => {
          const { job, company } = jobDetail;
          if (company) {
            dispatch(addCompany(company));
          }
          dispatch(addJob(job));
        },
        (error) => {
          console.error(error);
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Navbar title="PlaceMe" />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <JobTitleCard />
            <JobDetails />
          </div>
          <div className="col-12 col-md">
            <JobSummary jobSummaryList={jobSummaryList} />
            <JobAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
};

const JobTitleCard = () => {
  return (
    <div className="card shadow bg-white my-5">
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-md">
            <div className="d-flex align-items-center">
              <div className="p-2 p-sm-3 mr-3 mr-sm-5">
                <img
                  src="https://preview.colorlib.com/theme/jobsco/assets/img/icon/1.svg"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-capitalize">Software Engineer</h3>
                <div className="row">
                  <div className="col-auto my-1">
                    <i className="text-muted d-flex align-items-center">
                      <span className="material-icons">place</span>
                      Califonia, USA
                    </i>
                  </div>
                  <div className="col-auto my-1">
                    <i className="text-muted d-flex align-items-center">
                      <span className="material-icons">schedule</span>
                      Full-Time
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-auto d-flex align-items-center my-3">
            <button className="btn btn-block btn-outline-dark" type="submit">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const JobDetails = () => {
  return (
    <div className="card shadow bg-white">
      <div className="card-body">
        <h4 className="card-title py-3 px-1">Job Description</h4>
        <p>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don't look even slightly believable.
          If you are going to use a passage of Lorem Ipsum, you need to be sure
          there isn't anything embarrassing.
        </p>
      </div>
    </div>
  );
};

const JobSummary = ({ jobSummaryList }) => (
  <Card className="my-5">
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
  <Card className="my-5">
    <div className="card-body">
      <h5 className="text-center pt-3 pb-1">Job Summary</h5>
      <hr />
      <ul style={{ listStyleType: 'circle' }}>
        <ListItem name="Application Recived" value="10" />
      </ul>
    </div>
  </Card>
);

export default JobDescription;

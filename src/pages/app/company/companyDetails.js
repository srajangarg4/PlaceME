import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyById, fetchJobsByCompany } from 'middleware';
import { useDatabase } from 'hooks';
import { addCompany, addLimitedJobs } from 'actions';
import CompanyCard from './companyCard';
import { Loader, Navbar, Card, Button } from 'components';
import JobCard from '../job/components/jobCard';

const ContactCard = ({ contact }) => {
  return (
    <div className="row row-cols-1 row-cols-md-2">
      <div className="col">
        <Card>
          <div className="card-body">
            <div className="row">
              <div className="col-12 pb-3">
                <span className="text-capitalize">
                  <span className="material-icons">badge</span> {contact?.name}
                </span>
              </div>
              <div className="col pb-3">
                <a
                  href={`tel:${contact?.mobile}`}
                  className="text-decoration-none"
                >
                  <Button
                    buttonClassName="btn-outline-secondary"
                    iconName="call"
                    text="Call"
                  />
                </a>
              </div>
              <div className="col">
                <a
                  href={`mailto:${contact?.email}`}
                  className="text-decoration-none"
                >
                  <Button
                    buttonClassName="btn-outline-info"
                    iconName="email"
                    text="Mail"
                  />
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Representatives = ({ representatives }) => {
  return (
    <Card shadow className="my-5">
      <h4 className="card-header">Representatives</h4>
      <div className="card-body mx-3">
        {representatives?.map((contact, index) => (
          <ContactCard contact={contact} key={index} />
        ))}
      </div>
    </Card>
  );
};

const createRelatedJobState = (jobs, companyId) => {
  const relatedJobState = {};
  Object.keys(jobs).forEach((job) => {
    if (jobs[job]?.company === companyId) {
      relatedJobState[job] = jobs[job];
    }
  });
  return relatedJobState;
};

const RelatedJobs = ({ id }) => {
  const { jobs, hasAlreadyFetchedJobs } = useSelector((state) => state.job);
  const { loading, callDatabase } = useDatabase(
    fetchJobsByCompany,
    !hasAlreadyFetchedJobs,
  );
  const [relatedJobState, setRelatedJobState] = useState(
    createRelatedJobState(jobs, id),
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!hasAlreadyFetchedJobs) {
      callDatabase(
        (result) => {
          console.log(result);
          dispatch(addLimitedJobs(result));
          setRelatedJobState(createRelatedJobState(jobs, id));
        },
        (error) => {
          console.log(error);
        },
        id,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card shadow className="my-5">
      <h4 className="card-header">Jobs Posted of this Company</h4>
      <div className="card-body mx-3">
        {Object.keys(relatedJobState).map((job) => {
          return <JobCard id={job} job={jobs[job]} key={job} />;
        })}
        {loading && (
          <>
            <br />
            <div className="d-flex justify-content-center align-items-center">
              <Loader />
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

const CompanyDetails = () => {
  const { id } = useParams();
  const { companies } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  const { loading, callDatabase } = useDatabase(
    fetchCompanyById,
    !companies[id],
  );

  useEffect(() => {
    if (!companies[id]) {
      callDatabase(
        (data) => {
          dispatch(addCompany(data));
        },
        (error) => console.log(error),
        id,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="container p-4">
        <Card shadow>
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Loader />
            </div>
          ) : (
            <div className="card-body mx-3">
              <CompanyCard company={companies[id]} id={id} />
              <Representatives
                representatives={companies[id]?.representatives}
              />
              <RelatedJobs id={id} />
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default CompanyDetails;

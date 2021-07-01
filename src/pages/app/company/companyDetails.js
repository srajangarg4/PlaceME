import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCompanyById, fetchJobsByCompany } from 'middleware';
import { useDatabase } from 'hooks';
import { addCompany, addLimitedJobs } from 'actions';
import CompanyCard from './companyCard';
import { Loader, Navbar, Card, Button } from 'components';
import JobCard from '../job/components/jobCard';
import { showError } from 'components/toast';

const ContactCard = ({ contact }) => {
  return (
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
            <div className="col  pb-3">
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
  );
};

const Representatives = ({ representatives }) => {
  return (
    <Card shadow className="my-5">
      <h4 className="card-header">Representatives</h4>
      <div className="card-body mx-3">
        <div className="row row-cols-1 row-cols-md-2">
          {representatives?.map((contact, index) => (
            <ContactCard contact={contact} key={index} />
          ))}
        </div>
      </div>
    </Card>
  );
};

const RelatedJobs = ({ id }) => {
  const { jobs, hasAlreadyFetchedJobs } = useSelector((state) => state.job);
  const { loading, callDatabase } = useDatabase(
    fetchJobsByCompany,
    !hasAlreadyFetchedJobs,
  );
  const [relatedJobState, setRelatedJobState] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    if (!hasAlreadyFetchedJobs) {
      callDatabase(
        (result) => {
          dispatch(addLimitedJobs(result));
        },
        showError,
        id,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const temp = {};
    Object.keys(jobs).forEach((job) => {
      if (jobs[job]?.company === id) {
        temp[job] = jobs[job];
      }
    });
    setRelatedJobState(temp);
  }, [jobs, id]);

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
            <Loader />
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
        showError,
        id,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className="container p-4">
        {loading ? (
          <Loader />
        ) : (
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-md-10">
              <div className="shadow">
                <CompanyCard company={companies[id]} id={id} />
              </div>
              <Representatives
                representatives={companies[id]?.representatives}
              />
              <RelatedJobs id={id} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CompanyDetails;

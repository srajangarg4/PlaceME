import React from 'react';
import { useParams } from 'react-router';
import Card from 'components/card';
import { useSelector } from 'react-redux';
import { fetchCompanyById } from 'middleware';
import { useDatabase } from 'hooks';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { addCompany } from 'actions';
import CompanyCard from './companyCard';
import { Loader, Navbar } from 'components';

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
              <div className="row">
                <div className="col-12">
                  <CompanyCard company={companies[id]} id={id} />
                </div>
                <div className="col-12">
                  <Card>
                    <h4>Repersentaives</h4>
                  </Card>
                </div>
                <div className="col-12">
                  <Card>
                    <h4>Job Posted By the company</h4>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default CompanyDetails;

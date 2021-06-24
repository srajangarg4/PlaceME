import { addCompanies } from 'actions';
import { Loader, Navbar, Toast } from 'components';
import Card from 'components/card';
import { useDatabase } from 'hooks';
import { fetchAllCompanies } from 'middleware';
import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Routes } from 'utils';
import CompanyCard from './companyCard';

const Companies = () => {
  const { companies, hasAlreadyFetchedCompanies } = useSelector(
    (state) => state.company,
  );
  const dispatch = useDispatch();
  const { loading, callDatabase, errors } = useDatabase(
    fetchAllCompanies,
    !hasAlreadyFetchedCompanies,
  );
  useEffect(() => {
    if (!hasAlreadyFetchedCompanies) {
      callDatabase((data) => {
        dispatch(addCompanies(data));
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
          <div className="col-12 col-md-4 my-md-5">
            <Card shadow>
              <div className="card-body">
                <h5 className="text-center pt-3 pb-1">Company Filters</h5>
                <hr />
                <ul className="list-unstyled">
                  <li></li>
                </ul>
              </div>
            </Card>
          </div>
          <div className="col-12 col-md">
            <Card shadow>
              <div className="card-header bg-white">
                <div className="d-flex justify-content-between align-items-center pt-3">
                  <h4 className="text-center">Companies</h4>
                  <Link className="btn btn-primary" to={Routes.addCompany.path}>
                    Add company
                  </Link>
                </div>
              </div>
              <div className="card-body mx-3">
                {loading ? (
                  <div className="d-flex justify-content-center align-items-center">
                    <Loader />
                  </div>
                ) : (
                  Object.keys(companies).map((company) => {
                    return (
                      <CompanyCard
                        id={company}
                        company={companies[company]}
                        hasLink
                        key={company}
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

export default Companies;

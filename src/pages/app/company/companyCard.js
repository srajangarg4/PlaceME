import React from 'react';
import { Card } from 'components';
import { Link } from 'react-router-dom';
import { resolveDate, Routes } from 'utils';

const CompanyCard = ({ company, id, hasLink }) => {
  return (
    <Card>
      <div className="card-body">
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-md">
            <div className="row align-items-center">
              <div className="col-12 col-md-2 p-2 p-sm-3 mr-3 mr-sm-5">
                <img 
                  height={48}
                  width={46}
                  src={company?.logo?.url}
                  className="mx-auto d-block"
                  alt=""
                />
              </div>
              <div className="col-12 col-md">
                <h3 className="text-capitalize">{company?.name}</h3>
                <p className="text-capitalize">
                  -- Registered On :
                  {resolveDate(company?.registeredOn).toLocaleDateString()}
                </p>
                <div className="row">
                  <div className="col-auto my-1 text-muted d-flex align-items-center">
                    <span className="material-icons">language</span>
                    <a
                      href={
                        company?.website?.includes('://')
                          ? company?.website
                          : `//${company?.website}`
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted"
                    >
                      Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {hasLink && (
            <div className="col-12 col-md-auto d-flex align-items-center my-3">
              <Link
                className="btn btn-block btn-outline-dark"
                to={`${Routes.companyDetails.path}${id}`}
              >
                View
              </Link>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default CompanyCard;

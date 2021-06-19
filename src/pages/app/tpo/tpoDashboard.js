import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDatabase } from 'hooks';
import { Card, Navbar, Footer, Loader } from 'components';
import {
  fetchAllDepartments,
  fetchCompanies,
  fetchPendingRequest,
} from 'middleware';
import { addLimitedCompanies, addLimitedUpdateRequests } from 'actions';
import { Link } from 'react-router-dom';
import { addDepartments } from 'actions/department';
import PendingRequestCard from '../updateRequest/pendingRequestCard';
import { Routes } from 'utils';
import RecentJobs from '../job/components/limitedJobs';

const TpoDashboard = () => {
  return (
    <>
      <Navbar />
      <Statistics />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 d-md-flex">
            <RecentJobs />
          </div>
          <div className="col-12 col-md d-md-flex">
            <LimitedCompanies />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 d-md-flex">
            <Departments />
          </div>
          <div className="col-12 col-md d-md-flex">
            <LimitedPendingRequest />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Card shadow>
              <div className="card-header bg-white text-center">
                <h5>Recently Placed Students</h5>
              </div>
              <div className="card-body"></div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const CompanyCard = ({ gradient, company, id }) => {
  return (
    <Link
      to={`${Routes.companyDetails.path}/${id}`}
      className="text-decoration-none"
      style={{ color: 'black' }}
    >
      <Card className={gradient}>
        <div className="card-body">
          <h4 className="card-title">{company?.name}</h4>
          HR nagarro
        </div>
      </Card>
    </Link>
  );
};

const LimitedCompanies = () => {
  const { companies, hasAlreadyFetchedCompanies } = useSelector(
    (state) => state.company,
  );
  const dispatch = useDispatch();
  const { loading, callDatabase } = useDatabase(
    fetchCompanies,
    !hasAlreadyFetchedCompanies && Object.keys(companies).length < 3,
  );
  useEffect(() => {
    if (!hasAlreadyFetchedCompanies && Object.keys(companies).length < 3) {
      callDatabase((data) => {
        dispatch(addLimitedCompanies(data));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className="flex-md-fill" shadow>
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5>Companies</h5>
        <Link className="btn btn-outline-dark" to={Routes.addCompany.path}>
          Add Company
        </Link>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        ) : (
          Object.keys(companies).map((company) => {
            return (
              <CompanyCard
                key={company}
                id={company}
                company={companies[company]}
                gradient="gradient2"
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

const DepartmentCard = ({ department, gradient, id }) => {
  return (
    <Link to="/" className="text-decoration-none" style={{ color: 'black' }}>
      <Card className={gradient}>
        <div className="card-body">
          <h4 className="card-title">{department?.name}</h4>
          {department?.hodEmail}
        </div>
      </Card>
    </Link>
  );
};

const Departments = () => {
  const { departments, hasAlreadyFetchedDepartments } = useSelector(
    (state) => state.department,
  );
  const dispatch = useDispatch();
  const { loading, callDatabase } = useDatabase(
    fetchAllDepartments,
    !hasAlreadyFetchedDepartments,
  );
  useEffect(() => {
    if (!hasAlreadyFetchedDepartments) {
      callDatabase((data) => {
        dispatch(addDepartments(data));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className="flex-md-fill" shadow>
      <div className="card-header bg-white d-flex justify-content-between align-items-center">
        <h5>Departments</h5>
        <button className="btn btn-outline-dark">Add Dept</button>
      </div>
      <div className="card-body">
        <input type="search" className="form-control" placeholder="Search..." />
        <div
          className="px-3 mt-3"
          style={{ height: '500px', overflowY: 'scroll' }}
        >
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Loader />
            </div>
          ) : (
            Object.keys(departments).map((department) => {
              return (
                <DepartmentCard
                  key={department}
                  id={department}
                  department={departments[department]}
                  gradient="gradient2"
                />
              );
            })
          )}
        </div>
      </div>
    </Card>
  );
};

const LimitedPendingRequest = () => {
  const { requests, hasAlreadyFetchedRequests } = useSelector(
    (state) => state.updateRequest,
  );
  const dispatch = useDispatch();
  const { loading, callDatabase } = useDatabase(
    fetchPendingRequest,
    !hasAlreadyFetchedRequests && Object.keys(requests).length < 3,
  );
  useEffect(() => {
    if (!hasAlreadyFetchedRequests && Object.keys(requests).length < 3) {
      callDatabase((data) => {
        dispatch(addLimitedUpdateRequests(data));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Card className="flex-md-fill" shadow>
      <div className="card-header bg-white">
        <h5 className="text-center">Pending Update Requests</h5>
      </div>
      <div className="card-body mx-3">
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <Loader />
          </div>
        ) : (
          Object.keys(requests).map((request) => {
            return (
              <PendingRequestCard
                key={request}
                id={request}
                {...requests[request]}
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

// const StatCard = ({ gradientName, title, description }) => (
//   <div className="col d-flex align-self-stretch">
//     <Card className={`${gradientName}`}>
//       <div className="card-body">
//         <h6>{title}</h6>
//         <h3>{description}</h3>
//       </div>
//     </Card>
//   </div>
// );

const Statistics = () => {
  // const statFields = [
  //   { gradientName: 'gradient1', title: 'In Hand Offers', description: '8' },
  //   { gradientName: 'gradient2', title: 'Applied In', description: '22' },
  //   { gradientName: 'gradient3', title: 'Waiting for', description: '2' },
  //   {
  //     gradientName: 'red-orange',
  //     title: 'Pending Update',
  //     description: '12',
  //   },
  // ];

  return (
    <div className="col">
      <Card shadow>
        <div className="card-body">
          <h4 className="text-center card-title">Statistics</h4>
          <div className="text-white p-2">
            <div className="d-flex flex-wrap"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// https://apexcharts.com/react-chart-demos/bar-charts/basic/
export default TpoDashboard;

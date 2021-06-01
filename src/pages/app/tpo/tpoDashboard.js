import React from 'react';
import { Card, Navbar, Footer } from 'components';
const TpoDashboard = () => {
  return (
    <>
      <Navbar />
      <Statistics />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8 d-md-flex">
            <Card className="flex-md-fill">
              <div className="card-header bg-white">
                <h5 className="text-center">Recent Jobs</h5>
              </div>
              <div className="card-body mx-3">
                <JobTitleCard />
                <JobTitleCard />
                <JobTitleCard />
              </div>
              <div className="card-footer bg-white">
                <h6 className="text-muted text-center">See More</h6>
              </div>
            </Card>
          </div>
          <div className="col-12 col-md d-md-flex">
            <Card className="flex-md-fill">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5>Companies</h5>
                <button className="btn btn-outline-dark">Add Company</button>
              </div>
              <div className="card-body">
                <Card className="gradient2">
                  <img
                    src="https://preview.colorlib.com/theme/jobsco/assets/img/icon/1.svg"
                    alt="Nagarro"
                    className="card-img img-thumbnail"
                    style={{ maxHeight: '100px', backgroundColor: '#f2fefe' }}
                  />
                  <div className="card-body">
                    <h4 className="card-title">Nagarro Software Pvt Limited</h4>
                    HR nagarro
                  </div>
                </Card>
                <Card className="gradient3">
                  <img
                    src="https://preview.colorlib.com/theme/jobsco/assets/img/icon/1.svg"
                    alt="Nagarro"
                    className="card-img img-thumbnail"
                    style={{ maxHeight: '100px', backgroundColor: '#f2fefe' }}
                  />
                  <div className="card-body">
                    <h4 className="card-title">TCS</h4>
                    TCS Recruter name
                  </div>
                </Card>
              </div>
              <div className="card-footer bg-white">
                <h6 className="text-muted text-center">See More</h6>
              </div>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-4 d-md-flex">
            <Card className="flex-md-fill">
              <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <h5>Departments</h5>
                <button className="btn btn-outline-dark">Add Dept</button>
              </div>
              <div className="card-body">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search..."
                />
                <div
                  className="px-3 mt-3"
                  style={{ height: '500px', overflowY: 'scroll' }}
                >
                  <Card className="gradient1">
                    <div className="card-body">
                      <h4 className="card-title">
                        Computer Science and Engineering
                      </h4>
                      Hodname
                    </div>
                  </Card>
                  <Card className="gradient2">
                    <div className="card-body">
                      <h4 className="card-title">
                        Computer Science and Engineering
                      </h4>
                      Hodname
                    </div>
                  </Card>
                  <Card className="gradient2">
                    <div className="card-body">
                      <h4 className="card-title">
                        Computer Science and Engineering
                      </h4>
                      Hodname
                    </div>
                  </Card>
                  <Card className="gradient2">
                    <div className="card-body">
                      <h4 className="card-title">
                        Computer Science and Engineering
                      </h4>
                      Hodname
                    </div>
                  </Card>
                  <Card className="gradient2">
                    <div className="card-body">
                      <h4 className="card-title">
                        Computer Science and Engineering
                      </h4>
                      Hodname
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-12 col-md d-md-flex">
            <Card className="flex-md-fill">
              <div className="card-header bg-white">
                <h5 className="text-center">Pending Update Requests</h5>
              </div>
              <div className="card-body mx-3">
                <JobTitleCard />
                <JobTitleCard />
                <JobTitleCard />
              </div>
              <div className="card-footer bg-white">
                <h6 className="text-muted text-center">See More</h6>
              </div>
            </Card>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Card>
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

const JobTitleCard = () => {
  return (
    <div className="card shadow bg-white my-4">
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
              View
            </button>
          </div>
        </div>
      </div>
    </div>
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
      <Card>
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

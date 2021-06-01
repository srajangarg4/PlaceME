import React from 'react';
import { Card } from 'components';

const PendingRequest = () => (
  <div className="container py-4">
    <Request />
  </div>
);

const Request = () => (
  <Card className="overflow-hidden">
    <div className="row m-0">
      <div
        className="col-5 d-flex align-items-center text-white flex-column p-3"
        style={{ backgroundColor: '#e9726a' }}
      >
        <h4 className="text-center">Pending</h4>
        <div>
          <span class="badge badge-pill" style={{ backgroundColor: '#c96256' }}>
            Approved by
          </span>
        </div>
        <img
          className="img-fluid rounded-circle my-3"
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg?s=200"
          alt="profile"
          width="100"
        />
        <div>
          <span class="badge badge-pill" style={{ backgroundColor: '#c96256' }}>
            On 12-April-2020
          </span>
        </div>
      </div>
      <div className="col-7 p-3">
        <h3 className="text-center">Jane Doe</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a
          volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut
          pulvinar.
        </p>
      </div>
    </div>
  </Card>
);

export default PendingRequest;

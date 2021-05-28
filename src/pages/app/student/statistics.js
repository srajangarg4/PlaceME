import React from 'react';
import { Card } from '../../../components';

const StatCard = ({ gradientName, title, description }) => (
  <div className="col d-flex align-self-stretch">
    <Card className={`w-100 ${gradientName}`}>
      <div className="card-body">
        <h6>{title}</h6>
        <h3>{description}</h3>
      </div>
    </Card>
  </div>
);

const Statistics = () => {
  const statFields = [
    { gradientName: 'gradient1', title: 'In Hand Offers', description: '8' },
    { gradientName: 'gradient2', title: 'Applied In', description: '22' },
    { gradientName: 'gradient3', title: 'Waiting for', description: '2' },
    {
      gradientName: 'red-orange',
      title: 'Pending Update',
      description: '12',
    },
  ];

  return (
    <div className="col">
      <Card>
        <div className="card-body">
          <h4 className="text-center card-title">Statistics</h4>
          <div className="text-white p-2">
            <div className="row">
              <StatCard {...statFields[0]} />
              <StatCard {...statFields[1]} />
            </div>
            <div className="row">
              <StatCard {...statFields[2]} />
              <StatCard {...statFields[3]} />
            </div>
            <div className="row">
              <StatCard {...statFields[2]} />
              <StatCard {...statFields[3]} />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Statistics;

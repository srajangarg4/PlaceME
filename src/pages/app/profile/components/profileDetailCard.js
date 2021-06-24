import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'components';
import { formSections } from '../utils';
import { useSelector } from 'react-redux';

const ProfileDetailCard = ({ selectedNavigationOption }) => {
  const user = useSelector((state) => state.user);
  const { name, role } = { ...user };
  const { firstName, lastName, photoUrl } = { ...name };
  return (
    <div className="col-md order-md-2">
      <Card shadow>
        <div className="card-body text-center">
          <div>
            <img
              className="img-lg rounded-circle mb-4"
              src={
                photoUrl ??
                'https://img.icons8.com/bubbles/100/000000/administrator-male.png'
              }
              alt="profile"
            />
            <h4 className="text-capitalize">{firstName + ' ' + lastName}</h4>
            <p>{role}</p>
          </div>
          <hr />
          <div className="card-text">
            {Object.keys(formSections).map((section) => {
              return (
                <p key={section}>
                  <Link
                    to={formSections[section].path}
                    style={{ textDecoration: 'none' }}
                    className={`${
                      selectedNavigationOption === formSections[section].text
                        ? 'btn-link disabled'
                        : ''
                    }`}
                  >
                    {formSections[section].text}
                  </Link>
                </p>
              );
            })}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfileDetailCard;

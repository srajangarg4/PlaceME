import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../../components';
import { formSections } from '../utils';

const ProfileDetailCard = ({ onClickSection, selectedNavigationOption }) => {
  return (
    <div className="col-md order-md-2">
      <Card>
        <div className="card-body text-center">
          <div>
            <img
              className="img-lg rounded-circle mb-4"
              src="https://img.icons8.com/bubbles/100/000000/administrator-male.png"
              alt="profile"
            />
            <h4 className="text-capitalize">tera naam</h4>
            <p>Student</p>
          </div>
          <hr />
          <div className="card-text">
            {Object.keys(formSections).map((section) => {
              return (
                <p key={section}>
                  <Link
                    to="#"
                    style={{ textDecoration: 'none' }}
                    className={`${
                      selectedNavigationOption === formSections[section].text
                        ? 'btn-link disabled'
                        : ''
                    }`}
                    replace={false}
                    onClick={() => onClickSection(formSections[section])}
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

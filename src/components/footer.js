import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="card">
      <div className="container">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <div className="block">
                <h3 className="footer-heading mb-4">About Us</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius
                  quae reiciendis distinctio voluptates sed dolorum excepturi
                  iure eaque, aut unde.
                </p>
              </div>
            </div>

            <div className="col-md-6 col-lg-3">
              <div className="block-5 mb-5">
                <h3 className="footer-heading mb-4">Contact Info</h3>
                <ul className="list-unstyled">
                  <li className="address">Jaipur, Rajasthan</li>
                  <li className="phone">
                    <a href="tel://917062213801">+91&nbsp;&nbsp;70622 13801</a>
                  </li>
                  <li className="email">srajangarg4@gmail.com</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row pt-5 mt-5 text-center">
            <div className="col-md-12">
              <p>
                Copyright ©
                <script>document.write(new Date().getFullYear());</script>2021
                All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

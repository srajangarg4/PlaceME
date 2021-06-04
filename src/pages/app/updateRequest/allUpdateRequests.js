import React, { useCallback, useState } from 'react';
import { Badge, Button, Input } from 'components';
import { Link } from 'react-router-dom';
import { Routes } from 'utils';

const SideBar = ({ isOpen, className, children }) => (
  <div
    className={`vertical-nav ${isOpen ? 'active' : ''} ${className ?? ''}`}
    id="sidebar"
  >
    {children}
  </div>
);

const PendingRequests = ({ type }) => (
  <div className="row rounded border border-dark mt-4 py-3">
    <div className={`col-12 rounded ${type ?? ''}`}>
      <h5 className="">Mobile Number update</h5>
      <p className="blockquote-footer">Requested on</p>
      <Link
        buttonClassName="btn-sm btn-primary"
        to={Routes.updateRequestDetails.path}
      >
        View Details
      </Link>
    </div>
  </div>
);

const SearchBox = () => (
  <div className="row d-flex align-items-center">
    <div className="col-10 p-0">
      <Input placeholder="Search something here" iconName="search" />
    </div>
    <div className="col-2 bg-damger">
      <Button buttonClassName="btn btn-primary" fullWidth text="Add" />
    </div>
  </div>
);

const Filters = () => (
  <div className="row overflow-auto">
    <Badge text="By date" className="mr-2" />
    <Badge text="By Status" className="mr-2" />
    <Badge text="By Type" className="mr-2" />
    <Badge text="By Name" className="mr-2" />
  </div>
);

const PagingOptions = () => (
  <div className="row d-flex justify-content-end">
    <Button text="Next" />
  </div>
);

const MainContent = ({ open, children, className }) => (
  <div
    className={`page-content ${open ? 'active' : ''} px-3 ${className ?? ''}`}
    id="content"
  >
    <div>{children}</div>
  </div>
);

const AllUpdateRequests = () => {
  const [showSideNav, setShowSideNav] = useState(false);
  const toggleNav = useCallback(() => {
    setShowSideNav(!showSideNav);
  }, [showSideNav]);
  return (
    <div>
      <SideBar isOpen={showSideNav}></SideBar>
      <MainContent open={showSideNav}>
        <div className="p-3">
          <Button text="Open Side Menu" onClick={toggleNav} />
          <SearchBox />
          <Filters />
          <PendingRequests />
          <PendingRequests />
          <PendingRequests />
          <PagingOptions />
        </div>
      </MainContent>
    </div>
  );
};
export default AllUpdateRequests;

import React from 'react';
import { useSelector } from 'react-redux';



const OnlyWhen = ({ authentication, roles }) => {
  const auth = useSelector((state) => state.state);
    const userRole = auth.role;
    let canAccess = false;
    if (roles) {
        canAccess = 
    }
  return <div></div>;
};

export default OnlyWhen;

import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => (
  <div>
    <h1>403 - Not Authorized!</h1>
    <Link to='/'>Return to Home</Link>
  </div>
);

export default NotAuthorized;

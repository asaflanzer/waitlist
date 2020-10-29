import React from 'react';
import { Link } from 'react-router-dom';

const ServerError = () => (
  <div>
    <h1>500 - Internal Server Error!</h1>
    <Link to='/'>Return to Home</Link>
  </div>
);

export default ServerError;

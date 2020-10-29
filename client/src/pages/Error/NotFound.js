import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Oh oh! 404 - Looks like the page you are looking can't be found.</h1>
      <button onClick={() => history.goBack()}>Go Back</button>
      <button type='button' onClick={history.push('/')}>
        Home
      </button>
    </div>
  );
};

export default NotFound;

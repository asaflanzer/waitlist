import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfilePage = () => {
  const name = useParams();

  return (
    <div>
      <h1>User Profile Page</h1>
      User {name}
    </div>
  );
};

export default UserProfilePage;

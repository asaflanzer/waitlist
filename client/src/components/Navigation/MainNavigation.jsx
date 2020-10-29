import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
// context
import { AuthContext } from '../../context/auth-context';
// styles
import * as S from './styles';

const MainNavigation = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <S.Navigiation>
      <S.Logo>
        <h1>EventBooking</h1>
      </S.Logo>
      <S.NavItems>
        <ul>
          <li>
            <NavLink to={{ pathname: '/events', state: { from: 'root' } }}>
              Events
            </NavLink>
          </li>
          {user.token ? (
            <>
              <li>
                <NavLink to='/bookings'>Bookings</NavLink>
              </li>
              <li>
                <NavLink to='/user'>Profile</NavLink>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
          ) : (
            <NavLink to='/login'>Login</NavLink>
          )}
        </ul>
      </S.NavItems>
    </S.Navigiation>
  );
};

export default MainNavigation;

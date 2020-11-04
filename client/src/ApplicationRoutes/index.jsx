import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// context
import { AuthContext } from '../context/auth-context';
// pages
import LandingPage from '../pages/LandingPage';
import FormPage from '../pages/FormPage';
import StatusPage from '../pages/StatusPage';
import LoginPage from '../pages/admin/LoginPage';
import QueuePage from '../pages/admin/QueuePage';
// styles
import * as S from './styles';
// Cookies
import Cookies from 'universal-cookie';

// import NotFound from '../pages/Error/NotFound';
// import NotAuthorized from '../pages/Error/NotAuthorized';
// import ServerError from '../pages/Error/ServerError';

const cookies = new Cookies();

const ApplicationRoutes = () => {
  const { user } = useContext(AuthContext);

  const PrivateRoute = ({ children, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
  return (
    <Router>
      <S.GlobalStyle />
      <div className='App'>
        <S.MainContent>
          <Switch>
            {/* <PrivateRoute path='/status' user={user} component={StatusPage} />
            <PrivateRoute path='/queue' user={user} component={QueuePage} /> */}
            {/* 
            <PrivateRoute
              path='/status/:userId'
              user={user}
              component={StatusPage}
            /> */}
            <Route path='/status/:userId' component={StatusPage} />
            <Route path='/status' component={StatusPage} />

            <Route exact path='/' component={LandingPage} />
            {/* <Route path='/404' component={NotFound} />
            <Route path='/403' component={NotAuthorized} />
            <Route path='/500' component={ServerError} /> */}
            {/* {!user.token && (
              <>
                <Route path='/' component={LandingPage} />
                <Redirect exact from='/status' to='/' />
              </>
            )} */}
            {/* <Route path='/status' component={StatusPage} /> */}
            <Route path='/queue' component={QueuePage} />
            <Route path='/form' component={FormPage} />
            <Route path='login' component={LoginPage} />
            {/* // : ( // <Redirect exact from='/' to='/events' />
            // )} */}
            <Redirect from='/status' to='/' />
          </Switch>
        </S.MainContent>
      </div>
    </Router>
  );
};

export default ApplicationRoutes;

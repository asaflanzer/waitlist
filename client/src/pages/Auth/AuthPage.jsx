import React, { useState, useContext } from 'react';
// import axios from 'axios';
// context
import { AuthContext } from '../../context/auth-context';
// styles
import * as S from './styles';

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let requestBody = {
      query: `
        query Login($email: String!, $password: String!){
            login(email: $email, password: $password) {
                userId
                token
                tokenExpiration
            }
        }
      `,
      variables: {
        email: credentials.email,
        password: credentials.password,
      },
    };

    if (!isLogin) {
      requestBody = {
        query: `
          mutation CreateUser($email: String!, $password: String!) {
              createUser(userInput: {email: $email, password: $password }) {
                  _id
                  email
              }
          }
        `,
        variables: {
          email: credentials.email,
          password: credentials.password,
        },
      };
    }

    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then((resData) => {
        //console.log(resData);

        if (resData.data.login.token) {
          login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // axios({
    //   method: 'POST',
    //   url: 'http://localhost:5000/graphql',
    //   data: JSON.stringify(requestBody),
    //   headers: { 'Content-Type': 'application/json' },
    // })
    //   .then((res) => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error('Failed');
    //     }
    //     return res.json();
    //   })
    //   .then((resData) => {
    //     console.log(resData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    setLoading(false);
  };

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div>
      <S.AuthForm onSubmit={handleSubmit}>
        {!isLogin ? <h1>Sign up</h1> : <h1>Login</h1>}

        {!isLogin && (
          <>
            <S.FormControl>
              <label htmlFor='firstName'>First Name</label>
              <input
                value={credentials.firstName}
                onChange={handleChange}
                type='firstName'
                id='firstName'
                name='firstName'
              />
            </S.FormControl>
            <S.FormControl>
              <label htmlFor='lastName'>Last Name</label>
              <input
                value={credentials.lastName}
                onChange={handleChange}
                type='lastName'
                id='lastName'
                name='lastName'
              />
            </S.FormControl>
          </>
        )}
        <S.FormControl>
          <label htmlFor='email'>E-mail</label>
          <input
            value={credentials.email}
            onChange={handleChange}
            type='email'
            id='email'
            name='email'
          />
        </S.FormControl>
        <S.FormControl>
          <label htmlFor='password'>Password</label>
          <input
            value={credentials.password}
            onChange={handleChange}
            type='password'
            id='password'
            name='password'
          />
        </S.FormControl>
        {isLogin && (
          <S.FormControl>
            <input type='checkbox' className='checkbox' id='remember_me' />
            <label htmlFor='remember_me'>Remember me</label>
          </S.FormControl>
        )}
        <S.FormActions>
          <div>
            <button type='submit' disabled={loading}>
              {isLogin ? 'Login' : 'Sign up'}
            </button>
          </div>
          <div>
            {/* {isLogin ? 'New user? ' : 'Already have a user? '} */}
            <button className='href' type='button' onClick={handleSwitch}>
              {isLogin ? 'New user? Sign up' : 'Already have a user? Login'}
            </button>
          </div>
        </S.FormActions>
      </S.AuthForm>
    </div>
  );
};

export default AuthPage;

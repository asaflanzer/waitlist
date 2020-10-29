import React, { useState, useContext, useRef, useCallback } from 'react';
// import axios from 'axios';
// context
import { AuthContext } from '../../context/auth-context';
// components
import Login from './Login';
import Signup from './Signup';
import RightSide from './RightSide';
// styles
import * as S from './styles';

const useHookWithRefCallback = () => {
  const refContainer = useRef(null);
  const setRef = useCallback((node) => {
    if (refContainer.current) {
    }

    if (node) {
      refContainer.current = node;
    }
  }, []);

  return [setRef];
};

const AuthPage = () => {
  const [ref] = useHookWithRefCallback();
  const { login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const current = isLogin ? 'Sign Up' : 'Login';
  const style = isLogin ? 'right' : 'left';

  const handleTab = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      <S.LoginForm>
        <div className='wrapper' ref={ref}>
          {isLogin ? (
            <Login isLogin={isLogin} ref={ref} />
          ) : (
            <Signup isLogin={isLogin} ref={ref} />
          )}
        </div>
        <RightSide
          islogin={isLogin}
          handleTab={handleTab}
          ref={ref}
          current={current}
          style={style}
        />
      </S.LoginForm>
    </div>
  );
};

export default AuthPage;

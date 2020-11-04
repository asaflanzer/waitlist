import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../../assets/adopt.png';
// context
import { AuthContext } from '../../../context/auth-context';

// import { FirebaseContext } from '../../../../firebase/firebaseConfig';
// import 'firebase/auth';
// import 'firebase/firestore';
import './styled.scss';
// ant design
import { Typography } from 'antd';
import { Form, Input } from 'antd';
import { Row, Col } from 'antd';

const { Title } = Typography;

const LoginPage = () => {
  // const firebase = useContext(FirebaseContext);
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const history = useHistory();
  //   const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
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
        email: formData.email,
        password: formData.password,
      },
    };

    fetch('/graphql', {
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

    setLoading(false);
  };

  //   const handleLogout = () => {
  //     return firebase.auth().signOut();
  //   };

  const updateInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    formData.name !== '' && formData.email !== '' && formData.phone !== ''
      ? setDisabled(false)
      : setDisabled(true);
  };

  return (
    <div
      style={{
        margin: '0 auto',
        textAlign: 'center',
        maxWidth: 768,
        paddingTop: 30,
      }}
    >
      <Form
        onSubmit={handleLogin}
        autoComplete='off'
        style={{
          margin: '0 auto',
          textAlign: 'center',
          maxWidth: 768,
          minWidth: 300,
          paddingTop: 50,
        }}
      >
        <Row>
          <Col span={24}>
            <img
              src={logo}
              heigth='100'
              width='100'
              alt='logo'
              style={{ marginBottom: 10 }}
            />
            <Title level={3}>כניסת צוות</Title>
            <Row gutter={16}>
              <Col span={2} />
              <Col span={20}>
                <Form.Item>
                  <Input
                    dir='rtl'
                    type='email'
                    name='email'
                    placeholder='אימייל'
                    onChange={updateInput}
                    value={formData.email || ''}
                    autoComplete='off'
                  />
                </Form.Item>
                <Form.Item>
                  <Input
                    dir='rtl'
                    type='password'
                    name='password'
                    placeholder='סיסמה'
                    onChange={updateInput}
                    value={formData.password || ''}
                    autoComplete='new-password'
                  />
                </Form.Item>
                <div style={{ marginTop: 15 }}>
                  <button
                    type='primary'
                    onClick={handleLogin}
                    disabled={disabled}
                  >
                    התחברות
                  </button>
                </div>
              </Col>
              <Col span={2} />
            </Row>
          </Col>
        </Row>
        <br />
        <Link to='/'>חזור אחורה</Link>
      </Form>
    </div>
  );
};

export default LoginPage;

import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
// context
import { AuthContext } from '../../context/auth-context';

import './styled.scss';
// ant design
import { Typography } from 'antd';
import { Form, Input, Checkbox } from 'antd';
import { Modal } from 'antd';
// Cookies
import Cookies from 'universal-cookie';

// import io from 'socket.io-client';

// //SERVER DOMAIN
// const socket = io('http://localhost:8000/');

// socket.on('message', (message) => {
//   console.log(message);
// });
const cookies = new Cookies();

const { Title } = Typography;

const FormPage = () => {
  const history = useHistory();
  const { user, login } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [readDoc, setReadDoc] = useState(false);
  const [disabled, setDisabled] = useState(false); //TODO: fix disabled logic move to formik+yup

  useEffect(() => {
    if (cookies.get('token')) {
      history.push(`/status/${cookies.get('token').userId}`);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = () => {
    setReadDoc(!readDoc);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const requestBody = {
      query: `
          mutation CreateUser($name: String!, $email: String!, $phone: String!) {
              createUser(userInput: {name: $name, email: $email, phone: $phone }) {
                  userId
                  token
                  tokenExpiration
              }
          }
        `,
      variables: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
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
        console.log(resData.data);
        const { token, userId, tokenExpiration } = resData.data.createUser;

        // socket.emit('join-queue', userId);
        // socket.emit('queue', userId);

        if (token) {
          //SAVE TOKEN IN COOKIES
          cookies.set('token', {
            token: token,
            userId: userId,
            tokenExpiration: tokenExpiration,
          });
          // SAVE TO CONTEXT
          login(token, userId, tokenExpiration);
        }
        setLoading(false);
        history.push(`/status/${userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  };

  const info = () => {
    Modal.info({
      title: (
        <div style={{ textAlign: 'right', marginBottom: 10, paddingRight: 30 }}>
          הבהרות בנוגע ליום האימוץ
        </div>
      ),
      content: (
        <div style={{ margin: '0 auto', textAlign: 'right' }}>
          <p>
            - האימוץ יתקיים בנוכחות כל דיירי הבית
            <br /> כולל ילדים וכלבים
          </p>
          <p>
            לא כל הקודם זוכה - אנחנו נדבר עם כולם
            <br />
            ורק כשיסתיים התור יתקבלו החלטות
          </p>
          <p>
            ההמתנה יכולה לקחת זמן ויכול להיות שנחרוג
            <br />
            בשעת הסיום, נשמח שתתאזרו בסבלנות
          </p>
          <p>
            אין חובה להישאר עד תורכם אך יש להגיע
            <br />
            בזמן לפי עדכוני האפליקציה
          </p>
        </div>
      ),
      okText: 'אני מסכים/ה',
      onOk() {
        setReadDoc(true);
      },
    });
  };
  return (
    <div>
      <Form
        onSubmit={handleSubmit}
        style={{
          margin: '0 auto',
          textAlign: 'center',
          maxWidth: 768,
          minWidth: 300,
          paddingTop: 50,
        }}
      >
        <div style={{ margin: '0 auto', textAlign: 'center' }}>
          <Title level={3}>הכנס/י פרטים</Title>
        </div>
        <div style={{ marginTop: 30, textAlign: 'right' }}>
          <Form.Item>
            <Input
              dir='rtl'
              type='text'
              name='name'
              placeholder='שם מלא'
              onChange={handleChange}
              value={formData.name || ''}
            />
          </Form.Item>
          <Form.Item>
            <Input
              dir='rtl'
              type='email'
              name='email'
              placeholder='כתובת מייל לעדכון מיקומך בתור'
              onChange={handleChange}
              value={formData.email || ''}
            />
          </Form.Item>
          <Form.Item>
            <Input
              dir='rtl'
              type='tel'
              pattern='[0-9]*'
              name='phone'
              placeholder='מספר טלפון לעדכונים'
              onChange={handleChange}
              value={formData.phone || ''}
            />
          </Form.Item>
          <Typography.Text>קראתי ואני מסכימ/ה לגבי{` `}</Typography.Text>
          <Typography.Link onClick={info}>ההבהרות ליום אימוץ</Typography.Link>
          {` `}
          <Checkbox
            oname='agreement'
            onChange={handleCheck}
            checked={readDoc}
          />
        </div>

        <button
          type='submit'
          disabled={disabled || !readDoc ? 'disabled' : false}
          onClick={handleSubmit}
        >
          קח/י מספר
        </button>
      </Form>
    </div>
  );
};

export default FormPage;

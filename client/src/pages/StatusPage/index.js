import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
// context
import { AuthContext } from '../../context/auth-context';

// import './styled.scss';
// ant design
import { Result, Typography, Spin } from 'antd';
import { Timeline, Modal, Card } from 'antd';
import { Statistic, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
// custom hooks
import useQueue from '../hooks/useQueue';
import useGetUser from '../hooks/useGetUser';
// Cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// import io from 'socket.io-client';

// //SERVER DOMAIN
// const socket = io('http://localhost:8000/');

// socket.on('message', (message) => {
//   console.log(message);
// });

const StatusPage = () => {
  const userId = useParams(); // TO REMOVE if it takes it from the cookies
  const { user, login } = useContext(AuthContext);
  const { queueLength, lastServed } = useQueue();
  const { userStatus } = useGetUser();
  const [loading, setLoading] = useState(true);
  const [singleUser, setSingleUser] = useState(null);
  const [status, setStatus] = useState({
    length: '',
    next: '',
    last: '',
  });
  const history = useHistory();

  // useEffect(() => {
  //   // increment count
  //   socket.on('increment-queue', () => {
  //     setStatus((prev) => ({ ...prev, length: +1 }));
  //   });
  //   // decrement count
  //   socket.on('decrement-queue', () => {
  //     setStatus((prev) => ({ ...prev, length: -1 }));
  //   });
  // }, [status]);

  useEffect(() => {
    if (cookies.get('token') === undefined) {
      history.push('/');
    }
    login(
      cookies.get('token').token,
      cookies.get('token').userId,
      cookies.get('token').tokenExpiration
    );
    fetchSingleUser();
    fetchStatus();
    // return () => {
    //   setLoading(false);
    // };
  }, []);

  const fetchStatus = () => {
    setLoading(true);
    const requestBody = {
      query: `
          query {
              getStatus {
                  queueLength
                  nextInline {
                    name
                    number
                  }
                  lastServed {
                    name
                    number
                  }
              }
          }
      `,
    };

    fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData.data.getStatus);
        if (loading) {
          setStatus({
            length: resData.data.getStatus.queueLength,
            next: resData.data.getStatus.nextInline.number,
            last: resData.data.getStatus.lastServed.number,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        // if (loading) {
        //   console.log('err:', err);
        //   setLoading(false);
        // }
      });
  };

  const fetchSingleUser = () => {
    setLoading(true);
    const requestBody = {
      query: `
          query SingleUser($userId: String!) {
              singleUser(userId: $userId) {
                  name
                  number
                  createdAt
              }
          }
      `,
      variables: {
        userId: cookies.get('token').userId,
      },
    };

    fetch('/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData.data);
        if (loading) {
          setSingleUser(resData.data.singleUser);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (loading) {
          console.log('err:', err);
          setLoading(false);
        }
      });
  };

  // useEffect(() => {
  //   if (user.token !== '' || cookies.get('token') !== '') {
  //     console.log(user);
  //     setLoading(false);
  //   }
  //   return () => {
  //     history.push('/');
  //   };
  // }, [user]);

  useEffect(() => {
    // Once each user reachs number 10 in line, update status and send email via BE function
    if (queueLength === 10) {
      //update user status to NOTIFIED
      // db.collection('queue')
      //   .doc(cookies.get('inQueue'))
      //   .update({
      //     status: 'notified',
      //   })
      //   .then(() => {
      //     console.log('user is being notified');
      //   });
    }
  }, [queueLength]);

  const handleModal = (e) => {
    e.preventDefault();
    Modal.confirm({
      title: (
        <div style={{ textAlign: 'right', marginBottom: 10, paddingRight: 30 }}>
          יציאה
        </div>
      ),
      icon: <ExclamationCircleOutlined />,
      content: (
        <div style={{ margin: '0 auto', textAlign: 'right' }}>
          <p>?האם את/ה בטוח שאת/ה רוצה לבטל את תורך</p>
        </div>
      ),
      okText: 'כן, בטל את תורי',
      okType: 'danger',
      cancelText: 'חזור',
      onOk() {
        // db.collection('queue')
        //   .doc(userStatus.id)
        //   .delete()
        //   .then(() => {
        //     cookies.remove('inQueue');
        //     history.push('/');
        //     console.log('User deleted successfully');
        //   });
        //socket.emit('leave-queue', userStatus.id);
      },
      onCancel() {
        return true;
      },
    });
  };

  const userNumber = (number) => {
    const pad = (n, width, z) => {
      z = z || '0';
      n = n + '';
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join(z) + n;
    };

    return pad(number, 3);
  };
  return (
    <div
      style={{
        margin: '15px auto',
        textAlign: 'center',
        padding: '5px 20px 0 20px',
        maxWidth: 768,
      }}
    >
      {loading === true ? (
        <div>
          <Spin />
        </div>
      ) : cookies.get('token') === undefined ? (
        <div>
          <Result
            title='נראה שאין לכם מספר בתור'
            extra={<Link to='/'>חזרו אחורה לקחת מספר</Link>}
          />
        </div>
      ) : (
        <>
          <Card
            title={
              <div>
                <p>{` ,שלום ${singleUser.name}`}</p>
                <p>הצטרפת בהצלחה לרשימת ההמתנה</p>
                <p>ליום האימוץ של אדופט</p>
              </div>
            }
            style={{
              width: '100%',
              margin: '0 auto',
              border: '1px solid #000',
              borderRadius: 4,
            }}
          >
            <p>מספרך בתור</p>
            {singleUser && (
              <h2 style={{ fontSize: 50 }}>{`${userNumber(
                singleUser.number
              )}`}</h2>
            )}
            <Row gutter={16}>
              <Col span={8}>
                <Statistic
                  title='זמן המתנה משוער'
                  value={(status.length - status.next + 1) * 2}
                  prefix={`'דק`}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title='ממתינים לפניך'
                  value={status.length - status.next + 1}
                  prefix={<UserOutlined />}
                />
              </Col>
              {status.last !== '' && (
                <Col span={8}>
                  <Statistic
                    title='אחרונים שנכנסו'
                    value={`${userNumber(status.last)}`}
                    className='last-in'
                  />
                </Col>
              )}
            </Row>
            <Timeline mode='right' className='landing-timeline'>
              <Timeline.Item>
                - האימוץ יתקיים בנוכחות כל דיירי הבית
                <br /> כולל ילדים וכלבים
              </Timeline.Item>
              <Timeline.Item>
                לא כל הקודם זוכה - אנחנו נדבר עם כולם
                <br />
                ורק כשיסתיים התור יתקבלו החלטות
              </Timeline.Item>
              <Timeline.Item>
                ההמתנה יכולה לקחת זמן ויכול להיות שנחרוג בשעת הסיום, נשמח
                שתתאזרו בסבלנות
              </Timeline.Item>
              <Timeline.Item>
                אין חובה להישאר עד תורכם אך יש להגיע
                <br />
                בזמן לפי עדכוני האפליקציה
              </Timeline.Item>
            </Timeline>
            <Typography.Text type='secondary'>
              {singleUser
                ? dayjs(singleUser.createdAt).format('HH:mm', {
                    timeZone: 'Asia/Jerusalem',
                  })
                : ''}{' '}
              הצרפת לתור בשעה
            </Typography.Text>
            <p>כאשר מספרך יתקרב, תקבל מייל שיזכירך לשוב לגינת האימוץ</p>
            <Link to='/' onClick={handleModal}>
              ביטול התור
            </Link>
          </Card>
        </>
      )}
    </div>
  );
};

export default StatusPage;

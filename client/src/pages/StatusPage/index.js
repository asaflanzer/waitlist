import React, { useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
// context
import { AuthContext } from '../../context/auth-context';
// helpers
import userNumber from '../../helpers/userNumber';
// import './styled.scss';
// ant design
import { Result, Typography, Spin } from 'antd';
import { Timeline, Modal, Card } from 'antd';
import { Statistic, Row, Col } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
// custom hooks
import useStatus from '../../hooks/useStatus';
import useCurrentUser from '../../hooks/useCurrentUser';
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
  const history = useHistory();
  const { login } = useContext(AuthContext);
  const { loading, status } = useStatus();
  const { singleUser } = useCurrentUser();

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
  }, []);

  //useEffect(() => {
  // Once each user reachs number 10 in line, update status and send email via BE function
  //if (queueLength === 10) {
  //update user status to NOTIFIED
  // db.collection('queue')
  //   .doc(cookies.get('inQueue'))
  //   .update({
  //     status: 'notified',
  //   })
  //   .then(() => {
  //     console.log('user is being notified');
  //   });
  //}
  //}, [queueLength]);

  const fetchDeleteUser = (userId) => {
    const requestBody = {
      query: `
        mutation DeleteUser($userId: String!) {
          deleteUser(userId: $userId) {
            _id
            name
          }
        }
      `,
      variables: {
        userId: userId,
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
        console.log(resData);
        cookies.remove('token');
        //socket.emit('leave-queue', userStatus.id);
        history.push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        fetchDeleteUser(cookies.get('token').userId);
      },
      onCancel() {
        return true;
      },
    });
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
            <Row gutter={24}>
              {singleUser.number - status.nextInline.number === 0 ? (
                <>
                  <Col span={8}>
                    <Statistic
                      title='זמן המתנה משוער'
                      value={(singleUser.number - status.nextInline.number) * 2}
                      prefix={`'דק`}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title='ממתינים לפניך'
                      value='אין ממתינים'
                      prefix={<UserOutlined />}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col span={8}>
                    <Statistic
                      title='זמן המתנה משוער'
                      value={(singleUser.number - status.nextInline.number) * 2}
                      prefix={`'דק`}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title='ממתינים לפניך'
                      value={singleUser.number - status.nextInline.number}
                      prefix={<UserOutlined />}
                    />
                  </Col>
                </>
              )}

              {status.lastServed !== null && (
                <Col span={8}>
                  <Statistic
                    title='אחרונים שנכנסו'
                    value={`${userNumber(status.lastServed.number)}`}
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

import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
// context
import { AuthContext } from '../../../../context/auth-context';
// components
import Modal from '../../../Modal';
import Backdrop from '../../../Backdrop';
// styles
import * as S from './styles';

const EventItem = (props) => {
  const { user } = useContext(AuthContext);
  const { _id, title, price, date, description, creator } = props.event;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setOpen(true);
  };

  const handleNotLoggedIn = () => {
    setOpen(false);
  };

  const handleBookEvent = (eventId) => {
    setLoading(true);
    let requestBody = {
      query: `
        mutation BookEvent($id: ID!) {
          bookEvent(eventId: $id) {
            _id
            createdAt
            updatedAt
          }
        }
      `,
      variables: {
        id: eventId,
      },
    };
    fetch('http://localhost:5000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed');
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <S.EventItem>
      {loading ? (
        ' '
      ) : (
        <>
          <div>
            <h1>{title}</h1>
            <h2>
              ${price} - {new Date(date).toLocaleDateString('en-EN')}
            </h2>
            <p>{description}</p>
          </div>
          <div>
            {user.userId === creator._id ? (
              <button className='btn'>Delete</button>
            ) : (
              <>
                <button className='btn' onClick={handleModal}>
                  View
                </button>
                {user.userId && (
                  <button className='btn' onClick={() => handleBookEvent(_id)}>
                    Book Event
                  </button>
                )}
              </>
            )}
          </div>
          {open && (
            <>
              <Backdrop />
              {!user.token ? (
                <Modal
                  allowOk
                  handleOk={handleNotLoggedIn}
                  title={title}
                  setOpen={setOpen}
                  okText='Got it'
                >
                  <h2>
                    ${price} - {new Date(date).toLocaleDateString('en-EN')}
                  </h2>
                  <p>{description}</p>
                  <br />
                  <p>
                    You must be logged in to book events.{' '}
                    <Link to='/login'>Login</Link>
                  </p>
                </Modal>
              ) : (
                <Modal
                  allowOk
                  handleOk={handleBookEvent}
                  title={title}
                  setOpen={setOpen}
                  cancelText='Cancel'
                  okText='Book Event'
                >
                  <h2>
                    ${price} - {new Date(date).toLocaleDateString('en-EN')}
                  </h2>
                  <p>{description}</p>
                </Modal>
              )}
            </>
          )}
        </>
      )}
    </S.EventItem>
  );
};

export default EventItem;

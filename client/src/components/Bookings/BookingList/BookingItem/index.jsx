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
  const { booking, handleBookEvent, handleCancelBooking } = props;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleModal = () => {
    setOpen(true);
  };

  const handleNotLoggedIn = () => {
    setOpen(false);
  };

  return (
    <S.BookingItem>
      {loading ? (
        ' '
      ) : (
        <>
          <div>
            {booking.event.title} -{' '}
            {new Date(booking.createdAt).toLocaleDateString()}
          </div>
          <div>
            {booking._id ? (
              <button
                className='btn'
                onClick={() => handleCancelBooking(booking._id)}
              >
                Cancel Booking
              </button>
            ) : (
              <button
                className='btn'
                onClick={() => handleBookEvent(booking.event._id)}
              >
                Book Again
              </button>
            )}
          </div>
        </>
      )}
    </S.BookingItem>
  );
};

export default EventItem;

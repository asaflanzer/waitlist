import React from 'react';
// components
import BookingItem from './BookingItem';
// styles
import * as S from './styles';

const BookingList = (props) => {
  const { bookings, handleCancelBooking } = props;

  return (
    <S.BookingList>
      {bookings.map((booking) => {
        return (
          <BookingItem
            booking={booking}
            key={booking._id}
            handleCancelBooking={handleCancelBooking}
          />
        );
      })}
    </S.BookingList>
  );
};

export default BookingList;

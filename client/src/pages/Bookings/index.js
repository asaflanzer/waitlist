import React, { useState, useEffect, useContext } from 'react';
// context
import { AuthContext } from '../../context/auth-context';
// components
import BookingsControls from '../../components/Bookings/BookingsControls';
import BookingsList from '../../components/Bookings/BookingList';
import BookingsChart from '../../components/Bookings/BookingsChart';
import Spinner from '../../components/Spinner';
// styles
import * as S from './styles';

const BookingsPage = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [active, setActive] = useState(true);
  const [tabContent, setTabContent] = useState('list');

  useEffect(() => {
    fetchBookings();
    return () => {
      setActive(false);
    };
    // eslint-disable-next-line
  }, [active]);

  const fetchBookings = () => {
    setLoading(true);
    const requestBody = {
      query: `
              query {
                  bookings {
                      _id
                      createdAt
                      event {
                        _id
                        title
                        date
                        price
                      }
                  }
              }
          `,
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
        if (active) {
          console.log(resData.data.bookings);
          setBookings(resData.data.bookings);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          console.log(err);
          setLoading(false);
        }
      });
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

  const handleCancelBooking = (bookingId) => {
    setLoading(true);
    let requestBody = {
      query: `
          mutation CancelBooking($id: ID!) {
            cancelBooking(bookingId: $id) {
              _id
              title
            }
          }
        `,
      variables: {
        id: bookingId,
      },
    };

    // TODO: convert to apollo client
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
        setBookings(bookings.filter((booking) => booking._id !== bookingId));
        setLoading(false);
        return bookings;
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleTab = (type) => {
    if (type === 'list') {
      setTabContent('list');
    } else setTabContent('chart');
  };

  return (
    <S.Bookings>
      <h1>Bookings</h1>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <BookingsControls handleTab={handleTab} tabContent={tabContent} />
            <div>
              {tabContent === 'list' ? (
                <BookingsList
                  bookings={bookings}
                  userId={user.userId}
                  handleBookEvent={handleBookEvent}
                  handleCancelBooking={handleCancelBooking}
                />
              ) : (
                <BookingsChart bookings={bookings} />
              )}
            </div>
          </>
        )}
      </div>
    </S.Bookings>
  );
};

export default BookingsPage;

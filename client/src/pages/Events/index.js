import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
// context
import { AuthContext } from '../../context/auth-context';
// components
import EventList from '../../components/Events/EventList';
import Modal from '../../components/Modal';
import Backdrop from '../../components/Backdrop';
import Spinner from '../../components/Spinner';
// styles
import * as S from './styles';

const EventsPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: '',
    price: '',
    date: '',
    description: '',
  });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();

    return () => {
      setActive(false);
    };
    // eslint-disable-next-line
  }, [active]);

  const handleModal = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({
      ...prev,
      [name]: name === 'price' ? +value : value,
    }));
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const { title, price, date, description } = newEvent;

    //console.log({ newEvent });

    const requestBody = {
      query: `
          mutation CreatEvent($title: String!,$description: String!, $price: Float!, $date: String!){
              createEvent(eventInput: {title: $title, description: $description, price: $price, date: $date}) {
                  _id
                  title
                  description
                  price
                  date
              }
          }
      `,
      variables: {
        title,
        description,
        price,
        date,
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
      .then(({ data }) => {
        //console.log(data);
        const { _id, title, description, price, date } = data.createEvent;
        const event = {
          _id,
          title,
          description,
          price,
          date,
          creator: {
            _id: user.userId,
          },
        };
        setEvents([...events, event]);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
      });
  };

  const fetchEvents = () => {
    setLoading(true);
    const requestBody = {
      query: `
          query {
              events {
                  _id
                  title
                  description
                  price
                  date
                  creator {
                    _id
                    email
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
          setEvents(resData.data.events);
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

  return (
    <S.Container>
      {open && (
        <>
          <Backdrop />
          <Modal
            title='Create Event'
            setOpen={setOpen}
            handleOK={handleCreateEvent}
            cancelText='Cancel'
            okText='Create it'
          >
            <form onSubmit={handleCreateEvent}>
              <S.FormControl>
                <input
                  value={newEvent.title}
                  onChange={handleChange}
                  type='text'
                  name='title'
                  placeholder='Title'
                  required
                />
              </S.FormControl>
              <S.FormControl>
                <input
                  value={newEvent.price}
                  onChange={handleChange}
                  type='number'
                  name='price'
                  placeholder='Price'
                  required
                />
              </S.FormControl>
              <S.FormControl>
                <input
                  value={newEvent.date}
                  onChange={handleChange}
                  type='datetime-local'
                  name='date'
                  required
                />
              </S.FormControl>
              <S.FormControl>
                <textarea
                  value={newEvent.description}
                  onChange={handleChange}
                  rows='4'
                  name='description'
                  placeholder='description'
                  required
                />
              </S.FormControl>
              <S.FormActions>
                <button type='submit'>Create</button>
                <button onClick={() => setOpen(false)}>Cancel</button>
              </S.FormActions>
            </form>
          </Modal>
        </>
      )}
      <S.FormActions>
        {user.token ? (
          <>
            <p>Create your own event!</p>
            <button type='button' className='btn' onClick={handleModal}>
              Create Event
            </button>
          </>
        ) : (
          <p>
            You must be logged in to create events.{' '}
            <Link to='/login'>Login</Link>
          </p>
        )}
      </S.FormActions>
      <h1>Events</h1>
      <span>location: {location.pathname} </span>
      <button onClick={() => history.goBack()}>Go Back</button>

      <S.Events>
        {loading ? <Spinner /> : <EventList events={events} />}
      </S.Events>
    </S.Container>
  );
};

export default EventsPage;

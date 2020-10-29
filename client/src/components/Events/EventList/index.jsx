import React from 'react';
// components
import EventItem from './EventItem';
// styles
import * as S from './styles';

const EventList = (props) => {
  const { events, userId } = props;
  return (
    <S.EventList>
      {events.map((event) => (
        <EventItem event={event} key={event._id} userId={userId} />
      ))}
    </S.EventList>
  );
};

export default EventList;

import React from 'react';
import { Bar } from 'react-chartjs-2';
// components

// styles
import * as S from './styles';

const BOOKINGS_BUCKETS = {
  Cheap: {
    min: 0,
    max: 20,
  },
  Normal: {
    min: 20,
    max: 100,
  },
  Expensive: {
    min: 100,
    max: 1000000,
  },
};
const BookingsChart = (props) => {
  const { bookings } = props;

  const chartData = { labels: [], datasets: [] };
  let values = [];
  for (const bucket in BOOKINGS_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      if (
        current.event.price > BOOKINGS_BUCKETS[bucket].min &&
        current.event.price < BOOKINGS_BUCKETS[bucket].max
      ) {
        return prev + 1;
      } else return prev;
    }, 0);

    values.push(filteredBookingsCount);
    chartData.labels.push(bucket);
    chartData.datasets.push({
      //label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: values,
    });
    values = [...values];
    values[values.length - 1] = 0;
  }

  console.log(chartData);

  return (
    <S.BookingsChart>
      <Bar data={chartData} />
    </S.BookingsChart>
  );
};

export default BookingsChart;

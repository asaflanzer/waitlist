import React from 'react';
// components

// styles
import * as S from './styles';

const BookingsControls = (props) => {
  const { handleTab, tabContent } = props;

  return (
    <S.BookingsControls>
      <button
        onClick={() => handleTab('list')}
        className={tabContent === 'list' ? 'active' : ''}
      >
        List
      </button>
      <button
        onClick={() => handleTab('chart')}
        className={tabContent === 'chart' ? 'active' : ''}
      >
        Chart
      </button>
    </S.BookingsControls>
  );
};

export default BookingsControls;

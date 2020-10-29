import React from 'react';
// styles
import * as S from './styles';

const Spinner = () => {
  return (
    <S.Spinner>
      <div className='lds-spinner'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </S.Spinner>
  );
};

export default Spinner;

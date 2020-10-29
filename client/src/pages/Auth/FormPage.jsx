import React from 'react';
import loginImg from '../../assets/login.svg';
// styles
import * as S from './styles';

const FormPage = (props) => {
  const { ref } = props;
  return (
    <S.Container ref={ref}>
      <div className='content'>
        <div className='image'>
          <img src={loginImg} alt='' />
        </div>
        <div className='form'>
          <div className='form-group'>
            <input type='text' id='name' name='name' placeholder='Name' />
          </div>
          <div className='form-group'>
            <input type='email' id='email' name='email' placeholder='Email' />
          </div>
          <div className='form-group'>
            <input type='text' id='phone' name='phone' placeholder='Phone' />
          </div>
          <div className='footer'>
            <button type='button' className='btn'>
              Join Queue
            </button>
          </div>
        </div>
      </div>
    </S.Container>
  );
};

export default FormPage;

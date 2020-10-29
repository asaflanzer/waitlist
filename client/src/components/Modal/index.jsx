import React from 'react';
// styles
import * as S from './styles';

const Modal = (props) => {
  const {
    setOpen,
    allowOk,
    allowCancel,
    title,
    handleOk,
    cancelText,
    okText,
    children,
  } = props;
  return (
    <S.Modal>
      <header className='modal__header'>
        <h1>{title}</h1>
      </header>
      <section className='modal__content'>{children}</section>
      <section className='modal__action'>
        {allowCancel && (
          <button onClick={() => setOpen(false)}>{cancelText}</button>
        )}
        {allowOk && <button onClick={() => handleOk()}>{okText}</button>}
      </section>
    </S.Modal>
  );
};

export default Modal;

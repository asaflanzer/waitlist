import React from 'react';

const RightSide = (props) => {
  const { isLogin, handleTab, ref, current, style } = props;

  return (
    <div className={`${style} right-side`} onClick={handleTab} ref={ref}>
      <div className='inner-container'>
        <div className='text'>{current}</div>
      </div>
    </div>
  );
};

export default RightSide;

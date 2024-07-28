import React from 'react';
import './detail.css';

const Detail = () => {
  return (
    <div className='detail'>
      <div className="uesr">
        <img src="./avatar.png" alt="" />
        <h2>Nabeegh</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. At, vel.</p>
      </div>
      <div className="info">
        <div className="option"></div>
        <div className="title">
          <span>Chat Settings</span>
          <img src="./arrowUp.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Detail;

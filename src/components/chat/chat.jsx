import React from 'react';
import './chat.css';

const Chat = () => {
  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <span>Nabeegh</span>
            <p>Lorem adipisicing elit. Consequuntur, totam?</p>
          </div>
        </div>
        <div className="icon">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center"></div>
      <div className="bottom"></div>
    </div>
  );
};

export default Chat;

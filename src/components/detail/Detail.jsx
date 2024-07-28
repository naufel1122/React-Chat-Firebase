import React from 'react';
import './detail.css';

const Detail = () => {
  return (
    <div className='detail'>
      <div className="user">
        <img src="./avatar.png" alt="" />
        <h2>Nabeegh</h2>
        <p>Lorem ipsum dolor sit amet consectetur.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/24405903/pexels-photo-24405903/free-photo-of-beach-umbrellas-and-sunbeds-in-resort-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/24405903/pexels-photo-24405903/free-photo-of-beach-umbrellas-and-sunbeds-in-resort-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/24405903/pexels-photo-24405903/free-photo-of-beach-umbrellas-and-sunbeds-in-resort-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://images.pexels.com/photos/24405903/pexels-photo-24405903/free-photo-of-beach-umbrellas-and-sunbeds-in-resort-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="./download.png" alt="" className='icon' />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>
      <button>Block User</button>
      <button className='logout'>Logout</button>
      </div>
    </div>
  );
};

export default Detail;

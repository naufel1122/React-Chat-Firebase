import React, { useState, useEffect, useRef } from 'react';
import './chat.css';
import EmojiPicker from 'emoji-picker-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useChatStore } from '../../lib/chatStore';

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const { chatId } = useChatStore();
  const centerRef = useRef(null);

  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() =>{
     const unSub = onSnapshot(doc(db,"chats", chatId ), (res)=>{
      setChat(res.data())
     })

     return() =>{
      unSub()
     }
  },[])

  console.log(chat);
  

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleScroll = () => {
    if (centerRef.current) {
      if (centerRef.current.scrollHeight > centerRef.current.clientHeight) {
        centerRef.current.classList.add('scroll-visible');
      } else {
        centerRef.current.classList.remove('scroll-visible');
      }
    }
  };

  useEffect(() => {
    handleScroll(); // Check on mount
    window.addEventListener('resize', handleScroll); // Check on resize

    return () => {
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

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
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center" ref={centerRef} onScroll={handleScroll} >
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo veniam odio beatae corporis autem. Corrupti accusamus placeat eum error in animi laudantium odit ad iusto! Voluptatibus magni delectus obcaecati porro.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo veniam odio beatae corporis autem. Corrupti accusamus placeat eum error in animi laudantium odit ad iusto! Voluptatibus magni delectus obcaecati porro.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo veniam odio beatae corporis autem. Corrupti accusamus placeat eum error in animi laudantium odit ad iusto! Voluptatibus magni delectus obcaecati porro.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo veniam odio beatae corporis autem. Corrupti accusamus placeat eum error in animi laudantium odit ad iusto! Voluptatibus magni delectus obcaecati porro.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo veniam odio beatae corporis autem. Corrupti accusamus placeat eum error in animi laudantium odit ad iusto! Voluptatibus magni delectus obcaecati porro.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo veniam odio beatae corporis autem. Corrupti accusamus placeat eum error in animi laudantium odit ad iusto! Voluptatibus magni delectus obcaecati porro.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo veniam odio beatae corporis autem. Corrupti accusamus placeat eum error in animi laudantium odit ad iusto! Voluptatibus magni delectus obcaecati porro.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="https://images.pexels.com/photos/24405903/pexels-photo-24405903/free-photo-of-beach-umbrellas-and-sunbeds-in-resort-on-sea-shore.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load" alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo veniam odio beatae corporis autem. Corrupti accusamus placeat eum error in animi laudantium odit ad iusto! Voluptatibus magni delectus obcaecati porro.</p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input type="text" placeholder='Type a message...' value={text} onChange={e => setText(e.target.value)} />
        <div className="emoji">
          <img src="./emoji.png" alt="" onClick={() => setOpen(prev => !prev)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className='sendButton'>Send</button>
      </div>
    </div>
  );
};

export default Chat;

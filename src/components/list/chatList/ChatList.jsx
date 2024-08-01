import React, { useState, useEffect, useRef } from "react";
import AddUser from "./addUser/addUser"; // Corrected path
import "./chatList.css";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";


const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const { currentUser } = useUserStore();

  useEffect(() => {

    const unSub = onSnapshot(doc(db, "userChats", currentUser.id), async (res) => {
      const items = doc.data().chats;
      const promises = item.map( async (item) =>{
        const userDocRef = doc (db, "users" , item.receiverId) 
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data()

        return {...item, user}
      });

      const chatData = await Promises.all(promises)

      setChats(chatData.sort((a,b)=> b.updatedAt - a.updatedAt))


    });
    return () => {
      unSub()
    }

  }, [currentUser.id])



  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef(null);
  let scrollTimeout = useRef(null);

  const handleScroll = () => {
    setIsScrolling(true);
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000); // Adjust time as needed
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    scrollElement.addEventListener("scroll", handleScroll);
    return () => {
      scrollElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={scrollRef}
      className={`chatList ${isScrolling ? "" : "hidden-scrollbar"}`}
    >
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="Search Icon" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={addMode ? "./minus.png" : "./plus.png"}
          alt="Add/Remove Icon"
          className="add"
          onClick={() => setAddMode((prev) => !prev)}
        />
      </div>
      {addMode && <AddUser />} {/* AddUser component rendered conditionally */}
    {chats.map((chat)=>{

      <div className="item" key={chat.chatId}  >
      <img src="./avatar.png" alt="Avatar" />
      <div className="texts">
        <span>Nabeegh</span>
        <p>{chat.lastMessage}</p>
      </div>
    </div>
      })}
    
    </div >
  );
};

export default ChatList;

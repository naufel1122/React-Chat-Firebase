import React, { useState, useEffect, useRef } from "react";
import AddUser from "./addUser/addUser"; // Corrected path
import "./chatList.css";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";


const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

const {currentUser} = useUserStore();

useEffect(()=>{

  const unSub = onSnapshot(doc(db, "userChats", currentUser.id), (doc) => {
    setChats(doc.data())
});
return ()=>{
  unSub()
}

},[currentUser.id])


  
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
      {[...Array(1)].map((_, index) => (
        <div key={index} className="item">
          <img src="./avatar.png" alt="Avatar" />
          <div className="texts">
            <span>Nabeegh</span>
            <p>Hello</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

import React, { useState, useEffect, useRef } from "react";
import AddUser from "./addUser/addUser"; // Corrected path
import "./chatList.css";

const ChatList = () => {
  const [addMode, setAddMode] = useState(false);
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
      {[...Array(10)].map((_, index) => (
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

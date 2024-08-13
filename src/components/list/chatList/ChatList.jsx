import React, { useState, useEffect, useRef } from "react";
import AddUser from "./addUser/addUser";
import "./chatList.css";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null); 
  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollRef = useRef(null);
  let scrollTimeout = useRef(null);

  // Fetch chat data and listen for updates
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data()?.chats || [];
        console.log("Chat items retrieved:", items);

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const user = userDocSnap.data();
            console.log("User data fetched:", user);
            return { ...item, user };
          } else {
            console.log("No user data found for receiverId:", item.receiverId);
            return { ...item, user: null };
          }
        });

        const chatData = await Promise.all(promises);
        console.log("Final chat data:", chatData);

        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser.id]);

  useEffect(() => {
    if (chatId) {
      const updateChatSeenStatus = async () => {
        const userChatsRef = doc(db, "userChats", currentUser.id);
        const userChatsSnap = await getDoc(userChatsRef);

        if (userChatsSnap.exists()) {
          const chats = userChatsSnap.data()?.chats || [];
          const updatedChats = chats.map((chat) => ({
            ...chat,
            isSeen: chat.chatId === chatId ? true : chat.isSeen,
          }));

          await updateDoc(userChatsRef, { chats: updatedChats });
        }
      };

      updateChatSeenStatus();
      setSelectedChatId(chatId); 
    }
  }, [chatId, currentUser.id]);

  

  const handleSelect = async (chat) => {
    try {
      const userChatsRef = doc(db, "userChats", currentUser.id);
      const userChatsSnap = await getDoc(userChatsRef);

      if (userChatsSnap.exists()) {
        const userChats = userChatsSnap.data()?.chats || [];
        const chatIndex = userChats.findIndex(
          (item) => item.chatId === chat.chatId
        );

        if (chatIndex !== -1) {
          userChats[chatIndex].isSeen = true;
          await updateDoc(userChatsRef, { chats: userChats });
          setChats(userChats);
        }
      }

      // Change the selected chat and update the selectedChatId
      changeChat(chat.chatId, chat.user);
      setSelectedChatId(chat.chatId);
    } catch (err) {
      console.error("Error updating chat as seen:", err);
    }
  };

  const handleScroll = () => {
    setIsScrolling(true);
    clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
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
      {chats.map((chat) => (
        <div
          className="item"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor:
              chat.chatId === selectedChatId
                ? "#518fe" // Highlight selected chat
                : chat.isSeen
                ? "transparent" // Normal color for seen chats
                : "#5183f7", // Highlight color for unseen chats
          }}
        >
          <img src={chat.user?.avatar || "./avatar.png"} alt="Avatar" />
          <div className="texts">
            <span>{chat.user?.username || "Unknown User"}</span>
            <p>{chat.lastMessage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;

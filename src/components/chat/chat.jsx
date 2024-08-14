import React, { useState, useEffect, useRef } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";



const upload = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};


const Chat = () => {
  const [chat, setChat] = useState(null);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  
  
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();
  const centerRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSend = async () => {
    if (text.trim() === "" && !img.file) return; // Ensure there's either text or an image to send
    let imgUrl = null;
  
    try {
      if (img.file) {
        // Upload the image and get the URL
        imgUrl = await upload(img.file);
  
        // Handle the case if imgUrl is not returned correctly
        if (!imgUrl) {
          console.error("Image upload failed");
          return;
        }
      }
  
      // Update the chat document with the new message
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }), // Include image URL if it exists
        }),
      });
  
      // Update the user chats for both users
      const userIDs = [currentUser.id, user.id];
      await Promise.all(
        userIDs.map(async (id) => {
          const userChatRef = doc(db, "userChats", id);
          const userChatsSnapshot = await getDoc(userChatRef);
  
          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();
            const chatIndex = userChatsData.chats.findIndex(
              (c) => c.chatId === chatId
            );
  
            if (chatIndex !== -1) {
              userChatsData.chats[chatIndex] = {
                ...userChatsData.chats[chatIndex],
                lastMessage: text,
                isSeen: id === currentUser.id ? true : false,
                updatedAt: Date.now(),
              };
  
              await updateDoc(userChatRef, {
                chats: userChatsData.chats,
              });
            } else {
              console.error(
                `Chat with ID ${chatId} not found in userChatsData for user ${id}`
              );
            }
          } else {
            console.error(`User chat document not found for user ${id}`);
          }
        })
      );
    } catch (err) {
      console.error("Error sending message or updating user chats:", err);
    }
  
    // Reset image and text states
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };
  

  const handleScroll = () => {
    if (centerRef.current) {
      const isScrollVisible =
        centerRef.current.scrollHeight > centerRef.current.clientHeight;
      centerRef.current.classList.toggle("scroll-visible", isScrollVisible);
    }
  };

  useEffect(() => {
    handleScroll(); // Check on mount
    window.addEventListener("resize", handleScroll); // Check on resize

    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user.avatar || "./avatar.png"} alt="User Avatar" />
          <div className="texts">
            <span>{user.displayName || "Unknown User"}</span>
            <p>{user.status || "No status"}</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="Phone Icon" />
          <img src="./video.png" alt="Video Icon" />
          <img src="./info.png" alt="Info Icon" />
        </div>
      </div>
      <div className="center" ref={centerRef} onScroll={handleScroll}>
        {chat?.messages?.length > 0 ? (
          chat.messages.map((message) => (
            <div
              className={`message ${
                message.senderId === currentUser.id ? "own" : ""
              }`}
              key={message.createdAt.toString()}
            >
              <div className="texts">
                {message.img && <img src={message.img} alt="Message Content" />}
                <p>{message.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No messages yet</p>
        )}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="Image Icon" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img src="./camera.png" alt="Camera Icon" />
          <img src="./mic.png" alt="Mic Icon" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt="Emoji Picker"
            onClick={() => setOpen((prev) => !prev)}
          />
          {open && (
            <div className="picker">
              <EmojiPicker onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button className="sendButton" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;

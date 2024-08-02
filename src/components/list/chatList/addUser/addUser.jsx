import { doc, collection, getDocs, query, serverTimestamp, setDoc, where, updateDoc } from 'firebase/firestore';
import './addUser.css';
import { arrayUnion } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';
import { useState } from 'react';
import { useUserStore } from '../../../../lib/userStore';

const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get('username');

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      } else {
        console.log("No matching user found");
      }

    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: []
      });

      const chatDataForUser = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: currentUser.id,
        updatedAt: Date.now(),
      };

      const chatDataForCurrentUser = {
        chatId: newChatRef.id,
        lastMessage: "",
        receiverId: user.id,
        updatedAt: Date.now(),
      };

      // Update the userChats collection for the found user
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion(chatDataForUser),
      });

      // Update the userChats collection for the current user
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion(chatDataForCurrentUser),
      });

    } catch (err) {
      console.error("Error adding chat:", err);
    }
  };

  return (
    <div className='addUser'>
      <form onSubmit={handleSearch}>
        <input className='input' type="text" placeholder='Username' name='username' />
        <button>Search</button>
      </form>
      {user && <div className="user">
        <div className="detail">
          <img src={user.avatar || "./avatar.png"} alt="" />
          <span>{user.username}</span>
        </div>
        <button onClick={handleAdd}>Add User</button>
      </div>}
    </div>
  );
}

export default AddUser;

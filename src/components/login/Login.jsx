import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../lib/firebase"; // Ensure the path is correct
import "./login.css";




const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
  
    try {
      console.log("Attempting to register user...");
      // Register the user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User registered successfully", res);
  
      // Update the user's profile with the username
      await updateProfile(auth.currentUser, { displayName: username });
      console.log("User profile updated with username");
  
      // If an avatar is uploaded, handle the file upload to Firebase Storage
      if (avatar.file) {
        const avatarRef = ref(storage, `avatars/${auth.currentUser.uid}`);
        await uploadBytes(avatarRef, avatar.file);
        const avatarURL = await getDownloadURL(avatarRef);
        await updateProfile(auth.currentUser, { photoURL: avatarURL });
        console.log("User profile updated with avatar URL");
      }
  
      // Show success message
      toast.success("Registration successful!");
    } catch (err) {
      console.error("Error during registration", err);
      toast.error(err.message);
    }
  };
  

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="items">
        <h2>Welcome Back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit">Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="items">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="Avatar Preview" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

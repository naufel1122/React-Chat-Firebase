import React, { useState } from "react"; // Import useState
import "./login.css";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: ""
  });

  // Define the handleAvatar function properly
  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      });
    }
  };

  return (
    <div className='login'>
      <div className="item">
        <h2>Welcome Back,</h2>
        <form>
           <input type="text" placeholder="Email" name="email" />
           <input type="password" placeholder="Password" name="password" />
           <button type="submit">Sign In</button> {/* Added type="submit" */}
        </form>
      </div>
      <div className="separator"></div> {/* Fixed typo */}
      <div className="item">
        <h2>Create an Account</h2>
        <form>
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
          <button type="submit">Sign Up</button> {/* Changed to "Sign Up" */}
        </form>
      </div>
    </div>
  );
};

export default Login;

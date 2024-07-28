import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Correct import path without trailing spaces

const Notification = () => {
  return (
    <div>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default Notification;

import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext)

  return (
    <div className="navbar">
      <span className="logo">Chat App</span>
      <div className="user">

        <Avatar src={currentUser.photoURL} />
        <p>{currentUser.displayName}</p>
        <button onClick={() => signOut(auth)} title="logout">Logout</button>
      </div>
    </div>
  );
};

export default Navbar;

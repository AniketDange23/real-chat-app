import React, { useState } from "react";
import Add from "../images/addAavatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      console.log("Starting registration process...");

      // Create user
      console.log("Creating user with email:", email);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully:", res.user);

      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      console.log("Storage reference created:", storageRef);

      await uploadBytesResumable(storageRef, file).then(() => {
        console.log("Image upload completed. Getting download URL...");

        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log("Download URL obtained:", downloadURL);

          try {
            // Update profile
            console.log("Updating user profile...");
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            console.log("User profile updated successfully.");

            // Create user on Firestore
            console.log("Creating user document on Firestore...");
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            console.log("User document created successfully.");

            // Create empty user chats on Firestore
            console.log("Creating user chats document on Firestore...");
            await setDoc(doc(db, "userChats", res.user.uid), {});
            console.log("User chats document created successfully.");

            navigate("/");
            console.log("Navigation to home page.");
          } catch (err) {
            console.error("Error during Firestore operations:", err);
            console.log("Setting error state and stopping loading.");
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      console.error("Error during registration:", err);
      console.log("Setting error state and stopping loading.");
      setErr(true);
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <input type="text" required placeholder="displayName" />
          <input
            type="email"
            name="email"
            id="email"
            required
            placeholder="email"
          />
          <input type="password" required placeholder="password" />
          <input
            type="file"
            id="file"
            placeholder="image"
            style={{ display: "none" }}
          />
          <label htmlFor="file">
            <img src={Add} alt="" className="avatar" />
            <span>Add Avatar</span>{" "}
          </label>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image, please wait..."}
          {err && <span>Something went wrong</span>}
          <span>
            You already have an account? <Link to="/login">Login</Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;

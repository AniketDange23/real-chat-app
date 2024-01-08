import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="register-container">
      <div className="register-wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login Here</h1>
          <input type="email" required placeholder="email" />
          <input type="password" required placeholder="password" />
          <button>Login</button>
          <span>
            <p>
              You don't have an account? <Link to="/register">Register</Link>
            </p>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

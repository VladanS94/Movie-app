import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import classes from "../css/Login.module.css";
import { auth } from "./../firebase/firebase";
import { Link, Navigate } from "react-router-dom";
import { paths } from "../app/Route";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth, email, password);

      console.log("User logged in Successfully");
      <Navigate to={paths.home} />;
      alert("User logged in Successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.loginBody}>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form className={classes.loginForm} onSubmit={handleSubmit}>
        <h3>Login Here</h3>
        <label className={classes.loginLabel} htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          className={classes.loginInput}
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className={classes.loginLabel} htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className={classes.loginInput}
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={classes.loginButton}>
          Log In
        </button>
        Don't have account?{" "}
        <Link className={classes.formLink} to={paths.register}>
          Register Here
        </Link>
      </form>
    </div>
  );
}

export default Login;

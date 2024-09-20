import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import classes from "../css/Register.module.css";
import { auth, db } from "./../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { Link, Navigate } from "react-router-dom";
import { paths } from "../app/Route";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          wishlist: [],
        });
      }
      console.log("User Registered Successfully!!");

      <Navigate to={paths.login} />;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={classes.registerBody}>
    <form className={classes.registerForm} onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label className={classes.registerLabel}>First name</label>
        <input
          type="text"
          className={classes.registerInput}
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className={classes.registerLabel}>Last name</label>
        <input
          type="text"
          className={classes.registerInput}
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className={classes.registerLabel}>Email address</label>
        <input
          type="email"
          className={classes.registerInput}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className={classes.registerLabel}>Password</label>
        <input
          type="password"
          className={classes.registerInput}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className={classes.registerButton}>
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered? {" "}
        <Link className={classes.registerLink} to={paths.login}>
          Login
        </Link>
      </p>
    </form>
    </div>
  );
}
export default Register;

import React, { useEffect, useState } from "react";
import icon from "./../assets/netflix.png";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Switch from "./Switch";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDoc = doc(db, "Users", currentUser.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          setUserProfile(docSnapshot.data());
        } else {
          console.log("No such document!");
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      setShowLogoutModal(!showLogoutModal);
      console.log("User logged out successfully");
    });
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="navbar-icon" width={100} src={icon} alt="icon" />
      </Link>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Switch />
        {user && userProfile && (
          <div
            className="navbar-user"
            onClick={() => setShowLogoutModal(!showLogoutModal)}
          >
            <p className="navbar-username">
              {userProfile.firstName} {userProfile.lastName}
            </p>
            {showLogoutModal && (
              <div className="logout-modal">
                <Link to="/wishlist" onClick={() => setIsOpen(false)}>
                  <h1 className="navbar-wishlist">My wish list</h1>
                </Link>
                <p className="logout" onClick={handleLogout}>
                  LOG OUT
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>
    </nav>
  );
};

export default Navbar;

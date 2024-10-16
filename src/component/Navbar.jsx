import React, { useEffect, useState } from "react";
import icon from "./../assets/netflix.png";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Switch from "./Switch";
import { paths } from "../app/Route";
import { auth } from "../firebase/firebase";
import acc from "../assets/account.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      setShowLogoutModal(!showLogoutModal);
      console.log("User logged out successfully");
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = doc(db, "Users", currentUser.uid);
          const docSnapshot = await getDoc(userDoc);
          setIsOpen(false);

          if (docSnapshot.exists()) {
            console.log("Document data:", docSnapshot.data());
            setUserProfile(docSnapshot.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching document:", error.message);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return null;
  }

  return (
    <nav className="navbar">
      <Link to={paths.home}>
        <img className="navbar-icon" width={100} src={icon} alt="icon" />
      </Link>

      <div className="user-profile">
        <Switch />
        {user && userProfile && (
          <div onClick={() => toggleMenu()}>
            <img src={acc} alt="User Profile Icon" />
          </div>
        )}
        {isOpen && userProfile && (
          <div className="user-profile-model">
            <p>
              {userProfile.firstName} {userProfile.lastName}
            </p>
            <Link to={paths.wishlist} onClick={() => setIsOpen(false)}>
              <h1 className="navbar-wishlist">Wish list</h1>
            </Link>
            <p className="logout" onClick={handleLogout}>
              LOG OUT
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

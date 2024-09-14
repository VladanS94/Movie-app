import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const WishList = () => {
  const [userProfile, setUserProfile] = useState(null);

  const removeFromWishlist = async (movie) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = doc(db, "Users", currentUser.uid);

        // Remove the selected movie from the wishlist
        await updateDoc(userDoc, {
          wishlist: arrayRemove(movie),
        });

        // Update the local state after removal
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          wishlist: prevProfile.wishlist.filter((m) => m.id !== movie.id),
        }));

        console.log("Movie removed from wishlist!");
      }
    } catch (error) {
      console.error("Error removing movie from wishlist: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userDoc = doc(db, "Users", currentUser.uid);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
          setUserProfile(docSnapshot.data());
        } else {
          console.log("No such document!");
        }
      } else {
        setUserProfile(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="wishlist">
      {userProfile?.wishlist.map((movie) => {
        return (
          <div className="wishlist-card" key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt="..."
              />
              <p>{movie.title.slice(0, 15)}</p>
              <p>rating :{movie.vote_average}</p>
              <button
                onClick={() => removeFromWishlist(movie)}
                className="remove-btn-wishlist"
              >
                Remove
              </button>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default WishList;

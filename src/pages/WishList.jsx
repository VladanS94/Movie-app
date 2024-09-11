import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const WishList = () => {
  const [userProfile, setUserProfile] = useState(null);

  const removeFromWishlist = async () => {};

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

  console.log(userProfile);

  return (
    <div className="wishlist">
      {userProfile?.wishlist.map((movie) => {
        return (
          <div key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="..."
            />
            <p>{movie.title}</p>
            <p>{movie.vote_average}</p>
          </div>
        );
      })}
    </div>
  );
};

export default WishList;

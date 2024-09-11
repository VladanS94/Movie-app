import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { db } from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";

const CarouselMovie = ({ data }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const addToWishlist = async (movieId) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const wishlistRef = doc(db, "wishlists", user.uid);
        await updateDoc(wishlistRef, {
          movies: arrayUnion(movieId),
        });
        alert("Movie added to wishlist!");
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    } else {
      alert("Please log in to add movies to your wishlist.");
    }
  };

  return (
    <Carousel responsive={responsive}>
      {data.map((item, index) => {
        return (
          <div className="movie-cards" key={item.id}>
            <Link to={`${item.id}`}>
              <img
                width={250}
                height={250}
                loading={index <= 3 ? "eager" : "lazy"}
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title}
              />

              <h1 className="movie-home-title">{item.title}</h1>
              <div className="rating-container">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`star-icon ${
                      index < Math.round(item.vote_average / 2) ? "filled" : ""
                    }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
                <span className="rating-value">
                  {item.vote_average.toFixed(1)}
                </span>
              </div>
              <button
                onClick={() => addToWishlist(item.id)}
                className="wishlist-button"
              >
                Add to Wishlist
              </button>
            </Link>
          </div>
        );
      })}
    </Carousel>
  );
};

export default CarouselMovie;

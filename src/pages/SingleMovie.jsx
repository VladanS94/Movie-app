import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const apiKey = process.env.REACT_APP_API_KEY;

const SingleMovie = () => {
  const [data, setData] = useState([]);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();

  const fetchApiID = useCallback(async () => {
    await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  const fetchApiCredits = useCallback(async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => setCast(data.cast.slice(0, 10)));
  }, [id]);
  console.log(cast);

  const ImageSlider = ({ images }) => {
    return (
      <div className="w-full flex flex-row overflow-x-scroll">
        {images.map((url) => {
          return (
            <div key={url} className="w-full flex-shrink-0">
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt={cast.name}
              />
              <h1>{cast.character}</h1>
              <h1>{cast.name}</h1>
            </div>
          );
        })}
      </div>
    );
  };

  useEffect(() => {
    fetchApiID();
    fetchApiCredits();
  }, [fetchApiID, fetchApiCredits]);

  return (
    <div className="movie-container single-movie">
      <div className="movie-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.title}
          className="movie-poster"
        />
        <div className="movie-details">
          <h1 className="movie-title">{data.title}</h1>
          <p className="movie-info">
            <strong>Release Date:</strong> {data.release_date}
          </p>
          <p className="movie-info">
            <strong>Budget:</strong> $
            {data.budget ? data.budget.toLocaleString() : "N/A"}
          </p>
          <p className="movie-info">
            <strong>Revenue:</strong> $
            {data.revenue ? data.revenue.toLocaleString() : "N/A"}
          </p>
          <p className="movie-overview">{data.overview}</p>
          {data.genres && (
            <p className="movie-info">
              <strong>Genres:</strong>{" "}
              {data.genres.map((genre) => genre.name).join(", ")}
            </p>
          )}
          <p className="movie-tagline">
            <em>{data.tagline}</em>
          </p>
        </div>
      </div>
      <h1 className="cast-title">CASTS</h1>
      <div className="cast-content">
        {cast.map((cast) => {
          return (
            <div className="cast-card">
              <img
                src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                alt={cast.name}
              />
              <h4>Character name: {cast.character}</h4>
              <h4>Real name: {cast.name}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleMovie;

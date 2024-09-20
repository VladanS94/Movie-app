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
      .then((data) => setCast(data.cast.slice(0, 12)));
  }, [id]);

  const fetchApiVideos = useCallback(async () => {
    await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => setVideos(data.results));
  }, [id]);

  useEffect(() => {
    fetchApiID();
    fetchApiCredits();
    fetchApiVideos();
  }, [fetchApiID, fetchApiCredits, fetchApiVideos]);

  return (
    <div>
      <div className="movie-container single-movie">
        <img
          className="movie-bg-image"
          src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
          alt={data.title}
        />

        <div className="movie-card-details">
          <div className="movie-image">
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title}
              className="movie-poster"
            />
          </div>
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
      </div>
      <h1 className="cast-title">CASTS</h1>
      <div className="cast-content">
        {cast.map((cast) => {
          return (
            <div className="cast-card" key={cast.id}>
              <div className="book">
                <h4>Character name:</h4>
                <p> {cast.character}</p>
                <h4>Real name:</h4>
                <p>{cast.name}</p>
                <div className="cover">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${cast.profile_path}`}
                    alt={cast.name}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="video-trailer-container">
        <iframe
          width="100%"
          height="700"
          src={`https://www.youtube.com/embed/${videos[1]?.key}`}
          title="YouTube video player"
        ></iframe>
      </div>
    </div>
  );
};

export default SingleMovie;

import "./App.css";
import Nabvar from "./component/Nabvar";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Nabvar />
      <Home />
    </div>
  );
}

export default App;

// import { useEffect, useState } from "react";
// import "./App.css";

// function App() {
//   const [data, setData] = useState([]);
//   const [movie, setMovie] = useState([]);

//   const fetchMeal = async () => {
//     await fetch(
//       "https://api.themoviedb.org/3/movie/top_rated?api_key=3c22da73f60490462bd1c550ff7c026b&page=3"
//     )
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error(error));
//   };
//   const fetchMovie = async () => {
//     await fetch(
//       "https://api.themoviedb.org/3/movie/popular?api_key=3c22da73f60490462bd1c550ff7c026b"
//     )
//       .then((response) => response.json())
//       .then((data) => setMovie(data))
//       .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     fetchMeal();
//     fetchMovie();
//   }, []);

//   console.log(data);
//   console.log(movie);

//   return (
//     <div className="App">
//       {data.results?.map((item) => {
//         return (
//           <div>
//             <img
//               src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
//               alt="///"
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default App;

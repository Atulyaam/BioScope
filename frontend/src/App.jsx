import { Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home.jsx"
import Movies from "./pages/Movies.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="grow">
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home/>} />

            <Route path="/profile/:id" element={<h1>profile page</h1>}></Route>

            <Route path="/movies" element={<Movies></Movies>}></Route>


            <Route path="/movies/:state/:movieName/:id/ticket" element={<MovieDetail/>}>Movie Detail Page</Route>


            <Route path="/profile" element={<Profile></Profile>}></Route>
          </Routes>
          <Footer></Footer>
        </main>
      </div>
    </>
  );
}

export default App;

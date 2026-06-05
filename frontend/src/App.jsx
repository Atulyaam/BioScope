import { Route, Routes, useMatch } from "react-router-dom";
import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Home from "./pages/Home.jsx"
import Movies from "./pages/Movies.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Profile from "./pages/Profile.jsx";
import SeatLayout from "./pages/SeatLayout.jsx";
import CheckOut from "./pages/checkOut.jsx";

function App() {
  const seatLayoutPage = useMatch(
    "/movies/:movieId/:movieName/:state/theater/:theaterId/shows/:showId/seat-layout"
  )

  const isCheckout = useMatch("/shows/:showId/:state/checkout");
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {!seatLayoutPage && !isCheckout && <Header></Header>}
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/profile/:id" element={<h1>profile page</h1>}></Route>

            <Route path="/movies" element={<Movies></Movies>}></Route>

            <Route
              path="/movies/:state/:movieName/:id/ticket"
              element={<MovieDetail />}
            >
              Movie Detail Page
            </Route>

            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route
              path="/movies/:movieId/:movieName/:state/theater/:theaterId/shows/:showId/seat-layout"
              element={<SeatLayout></SeatLayout>}
            ></Route>

            <Route path="/shows/:showId/:state/checkout" element={<CheckOut></CheckOut>}></Route>
          </Routes>
          {!seatLayoutPage && !isCheckout && <Footer></Footer>}
          
        </main>
      </div>
    </>
  );
}

export default App;

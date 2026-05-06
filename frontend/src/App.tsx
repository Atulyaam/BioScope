import { Route,Routes} from "react-router-dom";
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"

function App() {
 

  return (
    <>
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Header></Header>
        <Routes>
          <Route path="/" element={<h1>
            Home Page
          </h1>}/>

          <Route
          path="/profile/:id"
          element = {<h1>profile page</h1>}
          >
          </Route>
         
          <Route
          path="/movies"
          element = {
            <h1>
              Movie page
            </h1>
          }
          ></Route>
        </Routes>
        <Footer>
          
        </Footer>
      </main>
    </div>

    </>
  )
}

export default App

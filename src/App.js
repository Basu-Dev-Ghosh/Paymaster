import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./Pages/Signup/Signup";
import Signup2 from "./Pages/Signup2/Signup2";
import SearchResult from "./Pages/SearchResult/SearchResult";
import Company from "./Pages/Company/Company";
import Invoice from "./Pages/Invoice/Invoice";


export const serverLink = 'https://paymaster-server-basu-dev-ghosh.vercel.app//api';
// export const serverLink = 'http://localhost:4000/api';


//<Route path="/" exact element={<PrivateRoutes Component={Page01} />} />
function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/search-result/:searchinput" element={<SearchResult />} />
        <Route path="/company/:name/:id" element={<Company />} />

      </Routes>

    </>
  );
}

export default App;

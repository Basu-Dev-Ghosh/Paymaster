import Home from "./Pages/Home/Home";
// import Page02 from "./Pages/Page_02";
import Login from "./Pages/Login/Login";

import Page05 from "./Pages/Page_05";
import Page06 from "./Pages/Page_06";
import Page07 from "./Pages/Page_07";
import Page08 from "./Pages/Page_08";
import Page09 from "./Pages/Page_09";
import Page10 from "./Pages/Page_10";

import ProgressBar from "./Components/ProgressBarHigh/ProgressBar";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import Signup from "./Pages/Signup/Signup";
import Signup2 from "./Pages/Signup2/Signup2";
import SearchResult from "./Pages/SearchResult/SearchResult";
import Company from "./Pages/Company/Company";

// export const serverLink = 'https://paymaster-backend.onrender.com/api';
export const serverLink = 'http://localhost:4000/api';


//<Route path="/" exact element={<PrivateRoutes Component={Page01} />} />
function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/search-result/:searchinput" element={<SearchResult />} />
        <Route path="/company/:id" element={<Company />} />
        <Route path="/page05/:id" exact element={<PrivateRoutes Component={Page05} />} />
        <Route path="/page06/:id" element={<Page06 />} />
        <Route path="/page07/:id" element={<Page07 />} />
        <Route path="/page09" exact element={<PrivateRoutes Component={Page09} />} />
        <Route path="/page08/:name/:location" element={<Page08 />} />
        <Route path="/page10" element={<Page10 />} />
      </Routes>

    </>
  );
}

export default App;

import Page01 from "./Pages/Page_01";
import Page02 from "./Pages/Page_02";
import Page03 from "./Pages/Page_03";
import Page04 from "./Pages/Page_04";
import Page05 from "./Pages/Page_05";
import Page06 from "./Pages/Page_06";
import Page07 from "./Pages/Page_07";
import Page08 from "./Pages/Page_08";
import Page09 from "./Pages/Page_09";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
export const serverLink = 'https://touristo-server.onrender.com/api';


//<Route path="/" exact element={<PrivateRoutes Component={Page01} />} />
function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Page01 />} />
        <Route path="/page02" element={<Page02 />} />
        <Route path="/page03" element={<Page03 />} />
        <Route path="/page04" element={<Page04 />} />
        <Route path="/page05/:id" exact element={<PrivateRoutes Component={Page05} />} />
        <Route path="/page06/:id" element={<Page06 />} />
        <Route path="/page07/:id" element={<Page07 />} />
        <Route path="/page09" exact element={<PrivateRoutes Component={Page09} />} />
        <Route path="/page08/:name/:location" element={<Page08 />} />
      </Routes>

    </>
  );
}

export default App;

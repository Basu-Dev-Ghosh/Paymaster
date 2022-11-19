import Page01 from "./Pages/Page_01";
import Page02 from "./Pages/Page_02";
import Page03 from "./Pages/Page_03";
import Page04 from "./Pages/Page_04";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Page01 />} />
        <Route path="/page02" element={<Page02 />} />
        <Route path="/page03" element={<Page03 />} />
        <Route path="/page04" element={<Page04 />} />
      </Routes>
    </>
  );
}

export default App;

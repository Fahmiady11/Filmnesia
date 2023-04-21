import { Route, Routes } from "react-router-dom";
import HalamanUtama from "./pages/main";
import DetailPage from "./pages/Detail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HalamanUtama />} />
      <Route path=":userId" element={<DetailPage />} />
    </Routes>
  );
}

export default App;

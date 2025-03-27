import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import IncomeGraph from "./componants/ExpensesTrack/IncomeGraph";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<MainPage />} />
        <Route path="/new" element={<IncomeGraph />} />
      </Routes>
    </Router>
  );
}

export default App;

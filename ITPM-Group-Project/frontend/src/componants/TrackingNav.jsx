import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import ExpensesMainPage from "./Expenses/ExpensesMainPage";
import IncomeMainPage from "./ExpensesTrack/IncomeMainPage";

function TrackingNav({ getNewValue }) {
  const [refresh, setRefresh] = useState(false);

  const refreshValue = () => {
    setRefresh((prev) => !prev);
    getNewValue();
  };

  return (
    <React.Fragment>
      <Routes>
        <Route
          path="/expenses"
          element={<ExpensesMainPage refreshValue={refreshValue} />}
        />
        <Route
          path="/income"
          element={<IncomeMainPage refreshValue={refreshValue} />}
        />
        <Route path="/" element={<Navigate to="income" />} />
      </Routes>
    </React.Fragment>
  );
}

export default TrackingNav;

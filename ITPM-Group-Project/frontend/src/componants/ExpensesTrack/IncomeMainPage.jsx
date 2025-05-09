import React from "react";
import { useState } from "react";

import IncomeGraph from "./IncomeGraph";
import ExpensesTrack from "./ExpensesTrack";

function IncomeMainPage({ refreshValue }) {
  const [refresh, setRefresh] = useState(false);

  const refreshIncomeGraph = () => {
    setRefresh((prev) => !prev);
    refreshValue();
  };

  return (
    <div className="flex flex-row">
      <div>
        <ExpensesTrack onIncomeAdded={refreshIncomeGraph} />
      </div>
      <div className="ml-10">
        <IncomeGraph refresh={refresh} />
      </div>
    </div>
  );
}

export default IncomeMainPage;

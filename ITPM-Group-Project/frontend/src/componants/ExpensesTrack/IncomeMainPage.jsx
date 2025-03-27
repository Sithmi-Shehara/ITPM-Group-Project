import React from "react";

import IncomeGraph from "./IncomeGraph";
import ExpensesTrack from "./ExpensesTrack";

function IncomeMainPage() {
  return (
    <div className="flex flex-row">
      <div>
        <ExpensesTrack />
      </div>
      <div className="ml-10">
        <IncomeGraph />
      </div>
    </div>
  );
}

export default IncomeMainPage;

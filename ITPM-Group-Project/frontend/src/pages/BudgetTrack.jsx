import React from "react";
import { NavLink } from "react-router-dom";

import Budgets from "../componants/Budgets/Budgets";
import TrackingNav from "../componants/TrackingNav";
import Balance from "../componants/ExpensesTrack/Balance";
import { useState } from "react";

function BudgetTrack() {
  const [refresh, setRefresh] = useState(false);

  const getNewValue = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="flex flex-col overflow-y-auto">
      <div className="flex flex-row">
        <Budgets refresh={refresh} />
        <Balance refresh={refresh} />
        <div className="ml-5 px-4 py-2 bg-white text-gray-800 rounded-md flex flex-col flex-grow items-center justify-center w-28 h-50">
          <div className="text-2xl font-semibold uppercase text-orange-600">
            {new Date().toLocaleDateString("en-US", { month: "short" })}
          </div>
          <div className="text-5xl font-bold text-orange-500">
            {new Date().getDate()}
          </div>
          <div className="text-xl text-gray-600">
            {new Date().getFullYear()}
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-5">
        <NavLink
          to="/budgets/income"
          className={({ isActive }) =>
            `flex justify-center items-center p-2 border-2 border-orange-400 font-bold rounded-2xl ${
              isActive
                ? "text-white bg-orange-400 hover:bg-orange-400 hover:text-white "
                : "text-orange-500 hover:text-orange-600"
            }`
          }
        >
          Income
        </NavLink>

        <NavLink
          to="/budgets/expenses"
          className={({ isActive }) =>
            `flex justify-center items-center p-2 border-2 border-orange-400 font-bold rounded-2xl ml-5 ${
              isActive
                ? "text-white bg-orange-400 hover:bg-orange-500 hover:text-white "
                : "text-orange-500 hover:text-orange-600 "
            }`
          }
        >
          Expenses
        </NavLink>
      </div>
      <div className="bg-white rounded-md mt-3">
        <TrackingNav getNewValue={getNewValue} />
      </div>
    </div>
  );
}

export default BudgetTrack;

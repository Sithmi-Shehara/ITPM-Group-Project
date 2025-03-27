import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaMoneyBillTrendUp, FaMoneyBillTransfer } from "react-icons/fa6";
import { GrTransaction } from "react-icons/gr";
import { HiDocumentReport } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";

function SideBar() {
  const location = useLocation();

  return (
    <div className="flex flex-col w-64 shadow-md p-4">
      <div className="flex flex-row h-15 items-center pl-1">
        <NavLink
          to="/sample"
          className={({ isActive }) =>
            `flex flex-row w-[100%] h-[80%] pl-3 items-center text-gray-700 hover:text-orange-800 hover:bg-orange-200 rounded-r-lg ${
              isActive ? "bg-orange-300 text-white font-bold" : ""
            }`
          }
        >
          <MdDashboard className="mr-3" />
          Dashboard
        </NavLink>
      </div>

      <div className="flex flex-row h-15 items-center pl-1">
        <NavLink
          to="/expensestrack"
          className={({ isActive }) =>
            `flex flex-row w-[100%] h-[80%] pl-3 items-center text-gray-700 hover:text-orange-800 hover:bg-orange-200 rounded-r-lg ${
              isActive ? "bg-orange-300 text-white font-bold" : ""
            }`
          }
        >
          <FaMoneyBillTrendUp className="mr-3" />
          My Income
        </NavLink>
      </div>

      <div className="flex flex-row h-15 items-center pl-1">
        <NavLink
          to="/expenses"
          className={({ isActive }) =>
            `flex flex-row w-[100%] h-[80%] pl-3 items-center text-gray-700 hover:text-orange-800 hover:bg-orange-200 rounded-r-lg ${
              isActive ? "bg-orange-300 text-white font-bold" : ""
            }`
          }
        >
          <FaMoneyBillTransfer className="mr-3" />
          My Expenses
        </NavLink>
      </div>

      <div className="flex flex-row h-15 items-center pl-1">
        <NavLink
          to="/view-expenses"
          className={({ isActive }) =>
            `flex flex-row w-[100%] h-[80%] pl-3 items-center text-gray-700 hover:text-orange-800 hover:bg-orange-200 rounded-r-lg ${
              isActive ? "bg-orange-300 text-white font-bold" : ""
            }`
          }
        >
          <GrTransaction className="mr-3" />
          Transaction
        </NavLink>
      </div>

      <div className="flex flex-row h-15 items-center pl-1">
        <NavLink
          to="/shoppinglist"
          className={({ isActive }) =>
            `flex flex-row w-[100%] h-[80%] pl-3 items-center text-gray-700 hover:text-orange-800 hover:bg-orange-200 rounded-r-lg ${
              isActive ? "bg-orange-300 text-white font-bold" : ""
            }`
          }
        >
          <HiDocumentReport className="mr-3" />
          Shopping list
        </NavLink>
      </div>

      <div className="flex flex-row h-15 items-center pl-1">
        <NavLink
          to="/sample2"
          className={({ isActive }) =>
            `flex flex-row w-[100%] h-[80%] pl-3 items-center text-gray-700 hover:text-orange-800 hover:bg-orange-200 rounded-r-lg ${
              isActive ? "bg-orange-300 text-white font-bold" : ""
            }`
          }
        >
          <IoMdSettings className="mr-3" />
          Setting
        </NavLink>
      </div>
    </div>
  );
}

export default SideBar;

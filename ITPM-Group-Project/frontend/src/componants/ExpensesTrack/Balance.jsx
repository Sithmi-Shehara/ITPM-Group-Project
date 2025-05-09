import React from "react";
import { useState, useEffect } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { getIncomeForMonth, getMonthlyBalance } from "../../api/income";

function Balance({ refresh }) {
  const [incomeList, setIncomeList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  const [expenses, setExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    fetchIncome();
    fetchBalance();
  }, [refresh]);

  const fetchIncome = async () => {
    try {
      const res = await getIncomeForMonth(year, month);
      setIncomeList(res.data);
    } catch (err) {
      console.error("Error fetching income:", err);
    }
  };

  useEffect(() => {
    const totalAmount = incomeList.reduce(
      (sum, income) => sum + income.amount,
      0
    );

    setTotalIncome(totalAmount);

    if (totalAmount > 0) {
      setExpenses((totalAmount - balance) / totalAmount);
      setTotalExpenses(totalAmount - balance);
    } else {
      setExpenses(0);
    }
  }, [incomeList, balance]);

  const fetchBalance = async () => {
    try {
      const res = await getMonthlyBalance(year, month);
      setBalance(res.data);
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  return (
    <div className="flex flex-col w-120 h-50 p-4 bg-white rounded-md">
      <div>
        <p className="text-xl font-semibold">Balance: {balance}</p>
      </div>
      <div className=" flex flex-row items-center h-full">
        <div className="flex flex-col justify-start items-start w-55">
          <div className="pl-5">
            <CircularProgressbar
              className="w-30 h-30"
              value={expenses * 100}
              maxValue={100}
              text={`${(expenses * 100).toFixed(1)}%`}
              styles={buildStyles({
                pathColor: balance < 0 ? "#FF4C4C" : "#f79330",
                textColor: "#f79330",
                trailColor: "#E5E7EB",
              })}
            />
          </div>
        </div>
        <div>
          <p className="text-xl font-bold">Total Income: {totalIncome}</p>
          <p className="text-xl font-bold">Total expenses: {totalExpenses}</p>
          <div className="mt-2">
            {expenses * 100 <= 30 && (
              <div className="p-3 bg-green-200 text-green-800 rounded-md">
                Great money health! You're saving very well.
              </div>
            )}

            {expenses * 100 > 30 && expenses * 100 <= 60 && (
              <div className="p-3 bg-yellow-200 text-yellow-800 rounded-md">
                You’re doing okay, but try to lower expenses for savings.
              </div>
            )}

            {expenses * 100 > 60 && expenses * 100 <= 80 && (
              <div className="p-3 bg-orange-200 text-orange-800 rounded-md">
                aution! Your expenses are getting high.
              </div>
            )}
            {expenses * 100 > 80 && expenses * 100 <= 100 && (
              <div className="p-3 bg-red-200 text-orange-800 rounded-md">
                Caution! Your expenses are getting very high.
              </div>
            )}

            {expenses * 100 > 100 && (
              <div className="p-3 bg-red-200 text-red-800 rounded-md">
                Over income! You're spending more than your income.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;

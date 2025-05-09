import React from "react";
import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import empty from "../../images/empty.gif";

function Budgets({ refresh }) {
  const [currentBudget, setCurrentBudget] = useState(null);
  const [expenses, setExpenses] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [overLimit, setOverLimit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showBudget, setShowBudget] = useState(false);
  const [amount, setAmount] = useState("");
  const [allBudgets, setAllBudgets] = useState([]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    fetch(`http://localhost:8080/api/budgets/status/${year}/${month}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setCurrentBudget(null);
          //setShowForm(true);
        } else {
          setCurrentBudget(data.budget);
          setExpenses(data.expenses);
          setRemaining(data.remaining);
          setOverLimit(data.overLimit);
          setShowForm(false);
        }
      });
  }, [refresh]);

  const handleSaveBudget = () => {
    const now = new Date();
    const payload = {
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      amount: parseFloat(amount),
    };

    fetch("http://localhost:8080/api/budgets/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => window.location.reload())
      .catch((err) => console.error("Error saving budget:", err));
  };

  const fetchAllBudgets = () => {
    fetch("http://localhost:8080/api/budgets/all")
      .then((res) => res.json())
      .then((data) => setAllBudgets(data));
  };

  return (
    <div
      className={`flex flex-col w-120 h-50 p-4 rounded-md mr-5 ${
        overLimit ? "bg-orange-200" : "bg-white"
      }`}
    >
      <h2 className="text-xl font-semibold">Budget: Rs.{currentBudget}</h2>
      <div className="flex flex-row mt-3 items-center">
        <div>
          {currentBudget !== null ? (
            <div className="flex flex-col w-55 justify-center h-full">
              <div className="flex ">
                {overLimit && (
                  <div className="flex flex-col justify-center items-center text-red-800 px-3 py-2 mt-2 rounded">
                    <div>
                      <img src={empty} className="w-20 h-auto" />
                    </div>
                    Budget limit exceeded!
                  </div>
                )}

                {!overLimit && (
                  <div className="flex pl-5">
                    {/* <ProgressBar
                  completed={((expenses / currentBudget) * 100).toFixed(1)}
                  maxCompleted={100}
                /> */}

                    <CircularProgressbar
                      className="w-30 h-30"
                      value={(expenses / currentBudget) * 100}
                      maxValue={100}
                      text={`${((expenses / currentBudget) * 100).toFixed(1)}%`}
                      styles={buildStyles({
                        pathColor: "#f79330",
                        textColor: "#f79330",
                        trailColor: "#E5E7EB",
                      })}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center w-55">
              <p>No budget</p>
              <p>set for this month</p>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-xl font-bold">Expenses: Rs.{expenses}</p>
            <p className="text-xl font-bold">Remaining: Rs.{remaining}</p>
          </div>

          <div className="flex flex-row mt-3">
            <div
              onClick={() => setShowForm(true)}
              className="flex justify-center items-center p-1 text-sm bg-orange-400 text-white rounded mr-3 hover:bg-orange-300"
            >
              {currentBudget ? "Update Budget" : "Add Budget"}
            </div>
            <div
              onClick={() => {
                fetchAllBudgets();
                setShowBudget(true);
              }}
              className="flex justify-center items-center p-1 text-sm bg-orange-400 text-white rounded hover:bg-orange-300"
            >
              All Budgets
            </div>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="flex flex-col w-100 h-auto p-5 rounded bg-white">
            <p className="text-md font-bold text-orange-800 mb-3">
              Current Month Budget
            </p>
            <input
              type="number"
              placeholder="Enter budget amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-orange-200 p-2 rounded w-full focus:outline-0"
            />
            <div className="flex flex-row justify-end mt-3">
              <div
                onClick={() => setShowForm(false)}
                className="flex justify-center items-center mt-2 mr-3 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                cancel
              </div>
              <div
                onClick={handleSaveBudget}
                className="flex justify-center items-center mt-2 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-500"
              >
                Save Budget
              </div>
            </div>
          </div>
        </div>
      )}

      {showBudget && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
          {allBudgets.length > 0 && (
            <div className="flex flex-col bg-white p-5 rounded w-100 h-auto h-max-250 overflow-auto">
              <p className="text-md font-bold text-orange-800">
                Previous Month Budgets
              </p>
              <ul className="mt-4 space-y-2">
                {allBudgets.map((b, idx) => (
                  <li
                    key={idx}
                    className="bg-orange-300 p-2 rounded font-bold text-orange-800"
                  >
                    {b.month}/{b.year}: Rs.{b.amount}
                  </li>
                ))}
              </ul>
              <div
                onClick={() => setShowBudget(false)}
                className="flex justify-center items-center mt-3 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                cancel
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Budgets;

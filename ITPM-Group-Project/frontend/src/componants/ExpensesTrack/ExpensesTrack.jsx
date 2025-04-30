import { useState, useEffect } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaRegFrownOpen } from "react-icons/fa";
import {
  getIncomeForMonth,
  addIncome,
  updateIncome,
  deleteIncome,
  getMonthlyBalance,
} from "../../api/income";

const IncomeManager = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [incomeList, setIncomeList] = useState([]);
  const [balance, setBalance] = useState(0);
  const [form, setForm] = useState({
    amount: "",
    description: "",
    incomeType: "ONE_TIME",
  });

  useEffect(() => {
    fetchIncome();
    fetchBalance();
  }, [year, month]);

  const fetchIncome = async () => {
    try {
      const res = await getIncomeForMonth(year, month);
      setIncomeList(res.data);
    } catch (err) {
      console.error("Error fetching income:", err);
    }
  };

  const fetchBalance = async () => {
    try {
      const res = await getMonthlyBalance(year, month);
      setBalance(res.data);
    } catch (err) {
      console.error("Error fetching balance: ", err);
    }
  };

  const handleAddIncome = async (e) => {
    e.preventDefault();
    try {
      const incomeData = {
        amount: parseFloat(form.amount),
        description: form.description,
        incomeType: form.incomeType,
        month: `${year}-${String(month).padStart(2, "0")}`,
      };
      await addIncome(incomeData);
      setForm({ amount: "", description: "", incomeType: "ONE_TIME" });
      fetchIncome();
      fetchBalance();
    } catch (err) {
      console.error("Error adding income:", err);
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await deleteIncome(id);
      fetchIncome();
      fetchBalance();
    } catch (err) {
      console.error("Error deleting income:", err);
    }
  };

  return (
    <div className="w-md p-6 rounded-md">
      <div className="flex flex-row justify-between">
        <div
          className={`flex flex-col w-40 p-2 justify-center items-center ${
            balance.toFixed(2) > 0 ? "bg-sky-300" : "bg-red-400"
          } rounded-md`}
        >
          <h3 className="text-xl font-bold text-white">
            Rs {balance.toFixed(2)}
          </h3>
          <h3 className="text-md font-bold text-white">you balance</h3>
        </div>

        <div className="flex flex-col ml-5">
          <div>
            <h2 className="pl-2 text-orange-900 ">Select month</h2>
          </div>
          <div className="flex flex-row mt-2">
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="p-2 w-24 h-9 mr-3 bg-purple-300 rounded-md"
            />
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="p-2 w-24 h-9 bg-purple-300 rounded-md"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m} className="bg-orange-100">
                  {new Date(0, m - 1).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <form onSubmit={handleAddIncome} className="mb-4 mt-4">
        <label className="pl-2 text-orange-900">Add your income here</label>
        <div className="flex gap-2">
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            placeholder="Amount"
            className="h-10 bg-orange-200 p-2 w-1/3 rounded-md"
            required
          />
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Description"
            className="h-10 bg-orange-200 p-2 w-1/3 rounded-md"
            required
          />
          <select
            value={form.incomeType}
            onChange={(e) => setForm({ ...form, incomeType: e.target.value })}
            className="h-10 bg-orange-200 p-2 w-1/3 rounded-md"
          >
            <option value="ONE_TIME">One-time</option>
            <option value="MONTHLY">Monthly</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md"
        >
          Add Income
        </button>
      </form>

      <div>
        <h3 className="text-lg font-medium mb-1 mt-2 bg-green-200 p-2 rounded-md">
          your income
        </h3>
        <ul className="">
          {incomeList.length === 0 ? (
            <div className="flex flex-row mt-5 ml-5 justify-center items-center">
              <FaRegFrownOpen />
              <p className="ml-2">No income records for selected month.</p>
            </div>
          ) : (
            incomeList.map((income) => (
              <li
                key={income.id}
                className="flex justify-between bg-white rounded-md mb-2 p-2"
              >
                <span>Rs {income.amount.toFixed(2)}</span>
                <span>{income.description}</span>
                <button
                  onClick={() => handleDeleteIncome(income.id)}
                  className="text-red-400 text-md hover:text-red-500"
                >
                  <RiDeleteBin6Fill />
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default IncomeManager;

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getYearlyExpenses } from "../../api/income";

const ExpensesGraph = ({ refresh }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearlyExpenses, setYearlyExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchYearlyEpenses();
  }, [year, refresh]);

  const fetchYearlyEpenses = async () => {
    try {
      setLoading(true);
      const res = await getYearlyExpenses(year);
      const formattedData = Array.from({ length: 12 }, (_, i) => ({
        month: new Date(0, i).toLocaleString("default", { month: "short" }),
        Expenses: res.data[i + 1] || 0,
      }));
      setYearlyExpenses(formattedData);
    } catch (err) {
      console.error("Error fetching yearly income:", err);
    }
    setLoading(false);
  };

  return (
    <div className="w-md p-6 rounded-md">
      {/* Year Selection */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-orange-900 mb-2">
          Select Year
        </h2>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          className="p-2 h-9 w-24 bg-purple-300 rounded-md"
        />
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-md h-[300px]">
          <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">
            Yearly Expenses Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={yearlyExpenses}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Expenses" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ExpensesGraph;

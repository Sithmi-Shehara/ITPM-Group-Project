import React from "react";
import { useState, useEffect } from "react";
import AddExpense from "./AddExpenses";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Label } from "recharts";

import jsPDF from "jspdf";

import ExpensesGraph from "./ExpensesGraph";

function ExpensesMainPage({ refreshValue }) {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    date: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [searchMonth, setSearchMonth] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState("");

  const refreshExpensesGraph = () => {
    setRefresh((prev) => !prev);
    refreshValue();
  };

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/all");
      const data = await response.json();
      setExpenses(data);
      setFilteredExpenses(data);
      refreshExpensesGraph();
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    let filtered = expenses;

    if (searchMonth) {
      filtered = filtered.filter((exp) => exp.date.startsWith(searchMonth));
    }
    if (searchDate) {
      filtered = filtered.filter((exp) => exp.date === searchDate);
    }

    setFilteredExpenses(filtered);
  }, [searchMonth, searchDate, expenses]);

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Expense name is required.";
    }

    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!formData.date) {
      newErrors.date = "Date is required.";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    fetchExpenses();
  }, [modalOpen]);

  // Delete expense
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this expense?"
    );
    if (!confirm) return;

    try {
      await fetch(`http://localhost:8080/api/expenses/delete/${id}`, {
        method: "DELETE",
      });
      alert("Expense deleted");
      fetchExpenses();
      refreshExpensesGraph();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  // Start editing
  const startEditing = (expense) => {
    setEditingExpense(expense);
    setFormData({
      name: expense.name,
      price: expense.price,
      date: expense.date,
      category: expense.category,
    });
  };

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await fetch(
          `http://localhost:8080/api/expenses/update/${editingExpense.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...formData,
              price: parseFloat(formData.price),
            }),
          }
        );
        alert("Expense updated");
        setEditingExpense(null);
        fetchExpenses();
        refreshExpensesGraph();
      } catch (error) {
        console.error("Error updating expense:", error);
      }
    }
  };

  const handleDownload = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/expenses/all");
      const data = await res.json();

      // Filter expenses for the selected month
      const filtered = data.filter((expense) => expense.date.startsWith(month));

      if (filtered.length === 0) {
        alert("No expenses found for the selected month.");
        return;
      }

      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text(`Expenses for ${month}`, 10, 10);

      let y = 20;
      filtered.forEach((exp, index) => {
        doc.setFontSize(12);
        doc.text(
          `${index + 1}. ${exp.name} - ${exp.price} (${exp.category})`,
          10,
          y
        );
        y += 10;
      });

      doc.save(`Expenses-${month}.pdf`);
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  return (
    <div className="flex flex-col">
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-999"></div>
      )}
      <div className="flex flex-row justify-between pt-5 px-5">
        <h2 className="font-bold text-xl text-orange-800">My Expenses</h2>
        <div className="flex flex-row">
          <div
            className="flex justify-center items-center px-4 py-2 text-md bg-green-500 hover:bg-green-400 rounded-md text-white mr-5"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Add Expenses
          </div>
          <div
            className="flex justify-center items-center bg-orange-400 hover:bg-orange-300 text-white px-4 py-2 rounded"
            onClick={() => setIsOpen(true)}
          >
            Download PDF
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-row">
        <div className="px-5 w-[600px] bg-white rounded-md">
          <h2 className="text-md text-orange-800 font-bold mb-4">
            All Expenses
          </h2>
          <div className="flex flex-row mb-3 justify-center items-center ">
            <div>
              <label>Search by Month</label>
              <input
                type="month"
                value={searchMonth}
                onChange={(e) => setSearchMonth(e.target.value)}
                className="border border-orange-800 focus:outline-orange-500 p-2 rounded"
                placeholder="Search by Month"
              />
            </div>
            <div>
              <label>Search by Date</label>
              <input
                type="date"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="border border-orange-800 focus:outline-orange-500 p-2 rounded"
                placeholder="Search by Date"
              />
            </div>
            <div
              onClick={() => {
                setSearchMonth("");
                setSearchDate("");
              }}
              className="flex justify-center items-center bg-gray-300 w-20 h-10 px-4 py-2 rounded hover:bg-gray-400"
            >
              Reset
            </div>
          </div>
          {filteredExpenses.length === 0 ? (
            <p>No expenses found.</p>
          ) : (
            <table className="w-full border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2">Name</th>
                  <th className="p-2">Price</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Category</th>
                  <th className="p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="">
                    <td className="p-2">{exp.name}</td>
                    <td className="p-2">{exp.price}</td>
                    <td className="p-2">{exp.date}</td>
                    <td className="p-2">{exp.category}</td>
                    <td className="p-2 flex flex-row justify-center items-center">
                      <div
                        onClick={() => startEditing(exp)}
                        className="flex justify-center items-center bg-yellow-400 text-white px-1 py-1 rounded hover:bg-yellow-500 mr-2"
                      >
                        <FaEdit />
                      </div>
                      <div
                        onClick={() => handleDelete(exp.id)}
                        className="flex justify-center items-center bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600"
                      >
                        <MdDelete />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Edit Form Modal */}
          {editingExpense && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Edit Expense</h3>
                <form  className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm">{errors.name}</p>
                  )}

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                  {errors.price && (
                    <p className="text-red-600 text-sm">{errors.price}</p>
                  )}

                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                  {errors.date && (
                    <p className="text-red-600 text-sm">{errors.date}</p>
                  )}

                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                  />
                  {errors.category && (
                    <p className="text-red-600 text-sm">{errors.category}</p>
                  )}

                  <div className="flex flex-row justify-end">
                    <div
                      type="button"
                      onClick={() => setEditingExpense(null)}
                      className="flex justify-center items-center bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded hover:bg-gray-500 mr-3"
                    >
                      Cancel
                    </div>
                    <div
                      type="submit"
                      onClick={handleUpdate}
                      className="flex justify-center items-center bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Update
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>

        <div>
          <ExpensesGraph refresh={refresh} />
        </div>
      </div>
      {modalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[1000] overflow-auto "
          onClick={(e) => e.stopPropagation()}
        >
          <AddExpense setModalOpen={setModalOpen} />
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-3">Select Month</h2>
            <input
              type="month"
              className="border p-2 rounded mb-3 w-full"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
            <div className="flex justify-end">
              <div
                className="flex justify-center items-center bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-400"
                onClick={handleDownload}
              >
                Download PDF
              </div>
              <div
                className="flex justify-center items-center bg-gray-300 px-4 py-2 rounded hover:bg-gray-200"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExpensesMainPage;

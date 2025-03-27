import React from "react";
import { useState, useEffect } from "react";
import AddExpense from "./AddExpenses";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ExpensesMainPage() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    date: "",
    category: "",
  });

  // Fetch all expenses
  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/expenses/all");
      const data = await response.json();
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  },);

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
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <div className="flex flex-col">
      {modalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-999"></div>
      )}
      <div className="flex flex-row justify-between pl-5 pr-5">
        <h2 className="font-bold text-xl text-orange-800">My Expenses</h2>
        <button
          className="p-3 text-md font-bold bg-green-500 rounded-md text-white"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Add Expenses
        </button>
      </div>
      <div className="mt-6">
        <div className="p-4 w-[600px] bg-white rounded-md">
          <h2 className="text-md text-orange-800 font-bold mb-4">
            All Expenses
          </h2>
          {expenses.length === 0 ? (
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
                {expenses.map((exp) => (
                  <tr key={exp.id} className="">
                    <td className="p-2">{exp.name}</td>
                    <td className="p-2">{exp.price}</td>
                    <td className="p-2">{exp.date}</td>
                    <td className="p-2">{exp.category}</td>
                    <td className="p-2 flex flex-row justify-center items-center">
                      <button
                        onClick={() => startEditing(exp)}
                        className="bg-yellow-400 text-white px-1 py-1 rounded hover:bg-yellow-500 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(exp.id)}
                        className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600"
                      >
                        <MdDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Edit Form Modal */}
          {editingExpense && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-96">
                <h3 className="text-xl font-semibold mb-4">Edit Expense</h3>
                <form onSubmit={handleUpdate} className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                  />
                  <div className="flex flex-row justify-end">
                    <button
                      type="button"
                      onClick={() => setEditingExpense(null)}
                      className="bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded hover:bg-gray-500 mr-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white font-bold px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
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
    </div>
  );
}

export default ExpensesMainPage;

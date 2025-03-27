import React, { useState } from "react";

const AddExpense = ({ setModalOpen }) => {
  const [expense, setExpense] = useState({
    name: "",
    price: "",
    date: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      ...expense,
      price: parseFloat(expense.price),
    };

    try {
      const response = await fetch("http://localhost:8080/api/expenses/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Expense added successfully!");
        console.log(result);
        setModalOpen(false);
        // Reset form
        setExpense({ name: "", price: "", date: "", category: "" });
      } else {
        alert("Failed to add expense");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding expense");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={expense.name}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={expense.price}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={expense.category}
          onChange={handleChange}
          className="w-full border border-gray-300 p-2 rounded"
          required
        />

        <div className="flex flex-row justify-end">
          <button
            className="w-20 font-bold bg-gray-300 text-gray-800 rounded hover:bg-gray-400 mr-3"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-20 font-bold bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;

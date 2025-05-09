import React, { useState } from "react";

const AddExpense = ({ setModalOpen }) => {
  const [expense, setExpense] = useState({
    name: "",
    price: "",
    date: "",
    category: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!expense.name.trim()) {
      newErrors.name = "Expense name cannot be empty.";
    }

    if (!expense.price || expense.price <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (!expense.date) {
      newErrors.date = "Date is required.";
    }

    if (!expense.category.trim()) {
      newErrors.category = "Category cannot be empty.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const expenseData = {
      ...expense,
      price: parseFloat(expense.price),
    };
    if (validateForm()) {
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
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      <h2 className="font-bold pl-2 text-orange-900 mb-3">Add Expense</h2>
      <form className="flex flex-col w-100 h-auto">
        <input
          type="text"
          name="name"
          placeholder="Expense Name"
          value={expense.name}
          onChange={handleChange}
          className="h-10 bg-orange-200 p-2 rounded-md mb-3 focus:outline-0"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={expense.price}
          onChange={handleChange}
          className="h-10 bg-orange-200 p-2 rounded-md mb-3 focus:outline-0"
        />
        {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}

        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          className="h-10 bg-orange-200 p-2 rounded-md mb-3 focus:outline-0"
        />
        {errors.date && <p className="text-red-600 text-sm">{errors.date}</p>}

        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          className="h-10 bg-orange-200 p-2 rounded-md mb-3 focus:outline-0"
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Health">Health</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
          <option value="Education">Education</option>
          <option value="Shopping">Shopping</option>
          <option value="Others">Others</option>
        </select>
        {errors.category && (
          <p className="text-red-600 text-sm">{errors.category}</p>
        )}

        <div className="flex flex-row justify-end mt-3">
          <div
            className=" flex justify-center items-center mt-2 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded-md mr-3"
            onClick={() => setModalOpen(false)}
            type="button"
          >
            Cancel
          </div>
          <div
            type="submit"
            onClick={handleSubmit}
            className="flex justify-center items-center mt-2 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md"
          >
            Submit
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;

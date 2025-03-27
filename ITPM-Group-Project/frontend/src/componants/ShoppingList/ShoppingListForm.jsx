import React, { useState } from "react";

const ShoppingListForm = ({ onGenerate }) => {
  const [form, setForm] = useState({
    numPeople: "",
    duration: "week",
    preference: "non-veg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <h2 className="text-lg font-bold">Shopping List Questionnaire</h2>
      <label className="block">
        Number of People:
        <input
          type="number"
          name="numPeople"
          value={form.numPeople}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
          required
        />
      </label>
      <label className="block">
        Duration:
        <select
          name="duration"
          value={form.duration}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="week">For a Week</option>
          <option value="month">For a Month</option>
        </select>
      </label>
      <label className="block">
        Dietary Preference:
        <select
          name="preference"
          value={form.preference}
          onChange={handleChange}
          className="w-full border p-2 rounded mt-1"
        >
          <option value="non-veg">Non-Vegetarian</option>
          <option value="veg">Vegetarian</option>
        </select>
      </label>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Generate
      </button>
    </form>
  );
};

export default ShoppingListForm;

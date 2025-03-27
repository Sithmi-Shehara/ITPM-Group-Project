import React from "react";

const GeneratedList = ({ list, onSave, onCancel }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-2">Generated Shopping List</h3>
      <ul className="list-disc ml-5 space-y-1">
        {list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onSave}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GeneratedList;

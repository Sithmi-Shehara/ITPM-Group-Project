import React from "react";
import { MdDelete } from "react-icons/md";

const SavedLists = ({ lists, handleDelete }) => {
  return (
    <div className="mt-6 overscroll-auto h-[50px]">
      <h2 className="text-lg font-bold mb-2">Saved Shopping Lists</h2>
      {lists.length === 0 ? (
        <p className="text-gray-500">No shopping lists found.</p>
      ) : (
        lists.map((list, index) => (
          <div key={index} className="bg-white p-3 rounded mb-3 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">
              Created: {new Date(list.createdDate).toLocaleDateString()}
            </p>
            <ul className="list-disc ml-5 text-sm">
              {list.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <button
              onClick={() => handleDelete(list.id)}
              className="bg-red-500 text-white px-1 py-1 rounded hover:bg-red-600"
            >
              <MdDelete />
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedLists;

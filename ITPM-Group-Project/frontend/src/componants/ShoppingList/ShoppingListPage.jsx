import React, { useState, useEffect } from "react";
import ShoppingListForm from "./ShoppingListForm";
import GeneratedList from "./GeneratedList";
import SavedLists from "./SavedLists";

const ShoppingListPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [generatedList, setGeneratedList] = useState([]);
  const [savedLists, setSavedLists] = useState([]);

  // Fetch saved lists on load
  useEffect(() => {
    fetch("http://localhost:8080/api/shoppinglists/all")
      .then((res) => res.json())
      .then((data) => setSavedLists(data))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  // Generate list based on input
  const handleGenerate = (form) => {
    const { numPeople, duration, preference } = form;
    const factor = duration === "week" ? 1 : 4;

    let list = [
      `Rice - ${2 * numPeople * factor}kg`,
      `Milk - ${numPeople * 7 * factor}L`,
      `Bread - ${numPeople * 4 * factor} loaves`,
      `Vegetables - ${3 * numPeople * factor}kg`,
    ];

    if (preference === "non-veg") {
      list.push(`Chicken - ${2 * numPeople * factor}kg`);
      list.push(`Eggs - ${numPeople * 12 * factor} eggs`);
    } else {
      list.push(`Lentils - ${2 * numPeople * factor}kg`);
    }

    setGeneratedList(list);
  };

  const handleSave = () => {
    fetch("http://localhost:8080/api/shoppinglists/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //userId: "USER_ID",
        items: generatedList,
        createdDate: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((saved) => {
        setSavedLists((prev) => [...prev, saved]);
        setShowModal(false);
        setGeneratedList([]);
      })
      .catch((err) => console.error("Save error:", err));
  };

  return (
    <div className="p-4">
      {/* Top Right Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Generate Shopping List
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            {!generatedList.length ? (
              <ShoppingListForm onGenerate={handleGenerate} />
            ) : (
              <GeneratedList
                list={generatedList}
                onSave={handleSave}
                onCancel={() => {
                  setGeneratedList([]);
                  setShowModal(false);
                }}
              />
            )}
          </div>
        </div>
      )}

      {/* Display Saved Lists */}
      <SavedLists lists={savedLists} />
    </div>
  );
};

export default ShoppingListPage;

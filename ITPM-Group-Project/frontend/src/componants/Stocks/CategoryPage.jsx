import React, { useEffect, useState } from "react";
import StockCategoryService from "../../api/stockCategoryService";
import "./css/stocks.css";
import { useNavigate } from "react-router-dom";
import ConfirmBox from "../Common/ConfirmBox";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await StockCategoryService.getAllCategories();
        if (response.status === 200) {
          setCategories(response.data);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Fetching Categories: " + error
        );
      }
    };
    getCategories();
  }, []);

  //add category
  const addCategory = async () => {
    if (!categoryName) {
      showMessage("Category name cannot be empty");
      return;
    }
    try {
      await StockCategoryService.addCategory({ name: categoryName });
      showMessage("Category successfully added");
      setCategoryName(""); //clear input
      window.location.reload(); //reload page
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Adding Category: " + error
      );
    }
  };

  //Edit category
  const editCategory = async () => {
    try {
      await StockCategoryService.updateCategory(editingCategoryId, {
        name: categoryName,
      });
      showMessage("Category successfully updated");
      setIsEditing(false);
      setCategoryName(""); //clear input
      window.location.reload(); //reload page
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Updating Category: " + error
      );
    }
  };

  //populate the edit category data
  const handleEditCategory = (category) => {
    setIsEditing(true);
    setEditingCategoryId(category.id);
    setCategoryName(category.name);
  };

  //delete category
  const handleDeleteCategory = async (categoryId) => {
    try {
      await StockCategoryService.deleteCategoryById(categoryId);
      showMessage("Category successfully deleted");
      window.location.reload(); //reload page
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Deleting in a Category: " + error
      );
    }
  };

  const openDelete = (data) => {
    setOpen(true);
    setDeleteData(data);
  }

  //metjhod to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const handleViewCategory = (category) => {
    navigate(`/stocks?category=${category}`);
  };

  return (
    <>
      {message && <div className="message">{message}</div>}
      <div className="category-page">
        <div className="category-header">
          <h1>Categories</h1>
          <div className="add-cat">
            <input
              value={categoryName}
              type="text"
              placeholder="Category Name"
              onChange={(e) => setCategoryName(e.target.value)}
            />

            {!isEditing ? (
              <button onClick={addCategory}>Add Category</button>
            ) : (
              <button onClick={editCategory}>Edit Category</button>
            )}
          </div>
        </div>

        {categories && (
          <ul className="category-list">
            {categories.map((category) => (
              <li className="category-item" key={category.id} onClick={() => handleViewCategory(category.name)}>
                <span >
                  {category.name}
                </span>

                <div className="category-actions">
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleEditCategory(category);
                  }}>
                    Edit
                  </button>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    openDelete(category);
                  }}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <ConfirmBox
        open={open}
        closeDialog={() => setOpen(false)}
        title={"Category"}
        deleteItem={deleteData.name}
        deleteFunction={() => handleDeleteCategory(deleteData.id)}
      />
    </>
  );
};

export default CategoryPage;
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StockCategoryService from "../../api/stockCategoryService";
import StockService from "../../api/stockService";

const AddEditStockPage = () => {
  const { stockId } = useParams("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [values, setValues] = useState({
    name: "",
    price: "",
    quantity: "",
    categoryId: "",
    purchasedDate: "",
    expiredDate: "",
    isFileUploaded: false,
    measurementUnit: ""
  })

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await StockCategoryService.getAllCategories();
        setCategories(categoriesData.data);
      } catch (error) {
        showMessage(
          error.response?.data?.message ||
            "Error Getting all Categories: " + error
        );
      }
    };

    const fetchStockById = async () => {
      if (stockId) {
        setIsEditing(true);
        try {
          const stockData = await StockService.findStockById(stockId);
          if (stockData.status === 200) {
            setValues({
              name: stockData.data.name,
              price: stockData.data.price,
              quantity: stockData.data.quantity,
              categoryId: stockData.data.categoryId,
              purchasedDate: stockData.data.purchasedDate,
              expiredDate: stockData.data.expiredDate,
              measurementUnit: stockData.data.measurementUnit,
              isFileUploaded: true
            })
            setImageUrl(stockData.data.filepath)
          } else {
            showMessage(stockData.data.message);
          }
        } catch (error) {
          showMessage(
            error.response?.data?.message ||
              "Error Getting a Stock by Id: " + error
          );
        }
      }
    };

    fetchCategories();
    if (stockId) fetchStockById();
  }, [stockId]);

  //method to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result)
      setValues({...values, isFileUploaded: true})
    }; //user imageurl to preview the image to upload
    reader.readAsDataURL(file);
  };

  const checkValidations = useCallback(() => {
    const errors = {};
    if (values.name === "") {
      errors.name = "Item name is required !";
    }
    if(values.price === "") {
      errors.price = "Unit Price is required !";
    }
    if (values.price <= 0) {
      errors.price = "Unit Price must be greater than 0 !";
    }
    if (values.quantity === "") {
      errors.quantity = "Quantity is required !"
    }
    if (values.quantity < 0) {
      errors.quantity = "Quantity must be greater than or equal to 0 !";
    }
    if (values.categoryId === "") {
      errors.categoryId = "Category is Required !";
    }
    if (values.purchasedDate === "") {
      errors.purchasedDate = "Purchased Date is Required !";
    }
    if (values.isFileUploaded === false) {
      errors.isFileUploaded = "Item Image is Required !"
    }
    setErrors(errors);
  }, [values, imageFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkValidations();
    if (Object.keys(errors).length) {
      return;
    }
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", Number(values.price));
    formData.append("quantity", Number(values.quantity));
    formData.append("categoryId", values.categoryId);
    formData.append("purchasedDate", values.purchasedDate);
    formData.append("expiredDate", values.expiredDate);
    formData.append("measurementUnit", (values.measurementUnit && values.measurementUnit !== "null") ? values.measurementUnit : "");
    console.log('values = ', values);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    // Add these logs before sending the request
    console.log('FormData entries:');
    for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      if (isEditing) {
        formData.append("id", stockId);
        await StockService.updateStock(stockId, formData);
        showMessage("Stock successfully updated");
      } else {
        await StockService.addStock(formData);
        showMessage("Stock successfully Saved");
      }
      navigate("/stocks");
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Saving a Stock: " + error
      );
    }
  };

  useEffect(() => {
    checkValidations();
  }, [values, checkValidations])

  const handleInput = (event) => {
    const newValues = {...values, [event.target.name]: event.target.value}
    setValues(newValues);
  }

  return (
    <>
      {message && <div className="message">{message}</div>}

      <div className="stock-form-page">
        <h1>{isEditing ? "Edit Product" : "Add Product"}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={(e) => handleInput(e)}
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Price (Rs)</label>
            <input
              type="number"
              name="price"
              value={values.price}
              onChange={(e) => handleInput(e)}
            />
            {errors.price && <p className="error-message">{errors.price}</p>}
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={values.quantity}
              onChange={(e) => handleInput(e)}
            />
            {errors.quantity && <p className="error-message">{errors.quantity}</p>}
          </div>

          <div className="form-group">
            <label>Measurement Unit</label>
            <select
              name="measurementUnit"
              value={values.measurementUnit}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Select an Unit</option>
              <option key="kg" value="kg">kg</option>
              <option key="g" value="g">g</option>
              <option key="ml" value="ml">ml</option>
              <option key="l" value="l">l</option>
            </select>
            {errors.measurementUnit && <p className="error-message">{errors.measurementUnit}</p>}
          </div>

          <div className="form-group">
            <label>Purchased Date</label>
            <input
              type="date"
              name="purchasedDate"
              value={values.purchasedDate}
              onChange={(e) => handleInput(e)}
            />
            {errors.purchasedDate && <p className="error-message">{errors.purchasedDate}</p>}
          </div>

          <div className="form-group">
            <label>Expired Date</label>
            <input
              type="date"
              name="expiredDate"
              value={values.expiredDate}
              onChange={(e) => handleInput(e)}
            />
            {errors.expiredDate && <p className="error-message">{errors.expiredDate}</p>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="categoryId"
              value={values.categoryId}
              onChange={(e) => handleInput(e)}
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && <p className="error-message">{errors.categoryId}</p>}
          </div>

          <div className="form-group">
            <label>Stock Item Image</label>
            <input type="file" onChange={handleImageChange} />
            {imageUrl && (
              <img src={imageUrl} alt="preview" className="image-preview" />
            )}
            {errors.isFileUploaded && <p className="error-message">{errors.isFileUploaded}</p>}
          </div>
          <button type="submit">{isEditing ? "Edit Stock Item" : "Add Stock Item"}</button>

        </form>
      </div>
    </>
  );
};

export default AddEditStockPage;
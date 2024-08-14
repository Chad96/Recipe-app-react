import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddRecipePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    preparationTime: "",
    cookingTime: "",
    servings: "",
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const recipeData = {
        ...formData,
        image: base64Image,
      };

      try {
        await axios.post("http://localhost:3000/recipes", recipeData);
        alert("Recipe added successfully!");
        // Keep the user on the same page
      } catch (error) {
        console.error("Failed to add recipe:", error);
        alert("Failed to add recipe.");
      }
    };

    if (formData.image) {
      reader.readAsDataURL(formData.image);
    } else {
      try {
        await axios.post("http://localhost:3000/recipes", formData);
        alert("Recipe added successfully!");
        // Keep the user on the same page
      } catch (error) {
        console.error("Failed to add recipe:", error);
        alert("Failed to add recipe.");
      }
    }
  };

  const formStyle = {
    maxWidth: "800px",
    margin: "auto",
    padding: "15px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    backgroundColor: "#fff",
  };

  const formGroupStyle = {
    marginBottom: "15px",
  };

  const inputStyle = {
    width: "100%",
  };

  const textareaStyle = {
    width: "100%",
    minHeight: "60px",
    resize: "vertical",
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Recipe</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="name">Recipe Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="preparationTime">Preparation Time</label>
              <input
                type="text"
                className="form-control"
                id="preparationTime"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="cookingTime">Cooking Time</label>
              <input
                type="text"
                className="form-control"
                id="cookingTime"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="servings">Servings</label>
              <input
                type="text"
                className="form-control"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="image">Recipe Image</label>
              <input
                type="file"
                className="form-control"
                id="image"
                onChange={handleImageChange}
                required
                style={inputStyle}
              />
            </div>
          </div>
        </div>
        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            className="form-control"
            id="ingredients"
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            style={textareaStyle}
          ></textarea>
        </div>
        <div className="form-group" style={formGroupStyle}>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            className="form-control"
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            style={textareaStyle}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddRecipePage;

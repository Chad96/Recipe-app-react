import React, { useState } from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";
import axios from "axios";

const AddRecipePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    category: "",
    preparationTime: "",
    cookingTime: "",
    servings: "",
    image: null, // Add image field
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataWithImage = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataWithImage.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:3000/recipes", formDataWithImage, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Recipe added successfully!");
    } catch (error) {
      console.error("Failed to add recipe:", error);
      setMessage("Failed to add recipe. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add Recipe</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <InputField
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={formData.name}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="ingredients"
          placeholder="Ingredients"
          value={formData.ingredients}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="instructions"
          placeholder="Instructions"
          value={formData.instructions}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="preparationTime"
          placeholder="Preparation Time"
          value={formData.preparationTime}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="cookingTime"
          placeholder="Cooking Time"
          value={formData.cookingTime}
          onChange={handleChange}
        />
        <InputField
          type="text"
          name="servings"
          placeholder="Servings"
          value={formData.servings}
          onChange={handleChange}
        />
        <div className="form-group">
          <label htmlFor="image">Recipe Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>
        <Button text="Add Recipe" />
      </form>
    </div>
  );
};

export default AddRecipePage;

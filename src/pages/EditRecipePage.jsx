import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import InputField from "../components/InputField";
import Button from "../components/Button";

const EditRecipePage = () => {
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
  const [imagePreview, setImagePreview] = useState("");
  const { id } = useParams(); // Get recipe ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the recipe details based on the ID
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/recipes/${id}`);
        setFormData(response.data);
        setImagePreview(response.data.image);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert image to base64 if present
      let imageBase64 = "";
      if (formData.image) {
        const reader = new FileReader();
        reader.onloadend = async () => {
          imageBase64 = reader.result;
          await updateRecipe(imageBase64);
        };
        reader.readAsDataURL(formData.image);
      } else {
        await updateRecipe(imageBase64);
      }
    } catch (error) {
      console.error("Failed to update recipe:", error);
    }
  };

  const updateRecipe = async (imageBase64) => {
    try {
      await axios.put(`http://localhost:3000/recipes/${id}`, {
        ...formData,
        image: imageBase64 || formData.image,
      });
      alert("Recipe updated successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Failed to update recipe:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/recipes/${id}`);
      alert("Recipe deleted successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Failed to delete recipe:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Recipe</h2>
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
        <InputField
          type="file"
          name="image"
          placeholder="Upload Image"
          onChange={handleChange}
        />
        {imagePreview && (
          <div className="mt-3">
            <img
              src={imagePreview}
              alt="Recipe Preview"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
        )}
        <Button text="Update Recipe" />
      </form>
      <Button
        text="Delete Recipe"
        onClick={handleDelete}
        className="mt-3 btn btn-danger"
      />
    </div>
  );
};

export default EditRecipePage;

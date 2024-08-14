import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch all recipes from the JSON server
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Saved Recipes</h2>
      <div className="row">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="col-md-4">
              <div className="card mb-4">
                <img
                  src={recipe.image}
                  className="card-img-top"
                  alt={recipe.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{recipe.name}</h5>
                  <p className="card-text">{recipe.description}</p>
                  {/* Add more recipe details here if needed */}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/recipes/${id}`);
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('/src/assets/your-background-image.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "0",
        margin: "0",
        position: "relative",
      }}
    >
      <header
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.1)", // semi-transparent background
          zIndex: "1000",
        }}
      >
        <h3 style={{ margin: "0", paddingLeft: "20px" }}>Recipe Master</h3>
        <nav
          style={{
            padding: "0 20px",
          }}
        >
          <Link
            to="/"
            style={{
              marginRight: "20px",
              textDecoration: "none",
              color: "#007bff",
            }}
          >
            Home
          </Link>
          <Link
            to="/add-recipe"
            style={{
              marginRight: "20px",
              textDecoration: "none",
              color: "#007bff",
            }}
          >
            Add Recipe
          </Link>
          <Link
            to="/profile"
            style={{
              textDecoration: "none",
              color: "#007bff",
            }}
          >
            Profile
          </Link>
        </nav>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "20px",
          paddingTop: "30%", // Add padding to avoid overlap with header
        }}
      >
        <div className="container">
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
                      <div className="d-flex justify-content-between">
                        <Link
                          to={`/edit-recipe/${recipe.id}`}
                          className="btn btn-warning"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(recipe.id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from "react";

const API_URL = "http://localhost:3001/toys";

function ToyForm({ onAddToy }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newToyObj = {
      ...formData,
      likes: 0,
    };

    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToyObj),
    })
      .then((res) => res.json())
      .then((savedToy) => {
        onAddToy(savedToy);
        setFormData({ name: "", image: "" });
      })
      .catch((err) => console.error("Error creating toy:", err));
  };

  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        {/* Changed this to match the "Add a Toy" string query */}
        <h3>Add a Toy</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <br />
        {/* Changed this back to match line 21's strict button click query */}
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
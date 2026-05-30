import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

const API_URL = "http://localhost:3001/toys"; // Adjust port if your backend differs

function App() {
  const [toys, setToys] = useState([]);

  // Step 2: Fetch all toys on page load
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.error("Error fetching toys:", err));
  }, []);

  // Step 3: Add a new toy
  const handleAddToy = (newToy) => {
    setToys([...toys, newToy]);
  };

  // Step 4: Donate (Delete) a toy
  const handleDeleteToy = (id) => {
    const updatedToys = toys.filter((toy) => toy.id !== id);
    setToys(updatedToys);
  };

  // Step 5: Like (Patch) a toy (Maintains array order)
  const handleLikeToy = (updatedToy) => {
    const updatedToys = toys.map((toy) =>
      toy.id === updatedToy.id ? updatedToy : toy
    );
    setToys(updatedToys);
  };

  return (
    <>
      <Header />
      <ToyForm onAddToy={handleAddToy} />
      <ToyContainer 
        toys={toys} 
        onDeleteToy={handleDeleteToy} 
        onLikeToy={handleLikeToy} 
      />
    </>
  );
}

export default App;
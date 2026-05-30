import React from "react";

const API_URL = "http://localhost:3001/toys";

function ToyCard({ toy, onDeleteToy, onLikeToy }) {
  const { id, name, image, likes } = toy;

  // Step 5: Handle Like (PATCH)
  const handleLikeClick = () => {
    fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: likes + 1,
      }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        onLikeToy(updatedToy);
      })
      .catch((err) => console.error("Error updating likes:", err));
  };

  // Step 4: Handle Donate (DELETE)
  const handleDeleteClick = () => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          onDeleteToy(id);
        }
      })
      .catch((err) => console.error("Error deleting toy:", err));
  };

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={handleLikeClick}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDeleteClick}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
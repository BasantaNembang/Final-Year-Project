import React from "react";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";

interface starRating {
  rating: number;
}

const StarRating = ({ rating }: starRating) => {
  const containerStyle = {
    display: "flex",
    gap: "0.5rem",
    fontSize: "1.3rem",
    marginTop: "1rem",
  };

  return (
    <div style={containerStyle}>
      {[0, 1, 2, 3, 4].map((_, index) => (
        <span key={index}>{index < rating ? <FaStar /> : <FiStar />}</span>
      ))}
    </div>
  );
};

export default StarRating;

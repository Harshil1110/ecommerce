import React from "react";

const Ratings = ({ ratingss }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= ratingss) {
      // Filled star for ratings greater than or equal to current value
      stars.push(<i key={i} className="fas fa-star text-warning" />);
    } else {
      // Empty star for ratings less than current value
      stars.push(<i key={i} className="far fa-star text-warning" />);
    }
  }
  return <div>{stars}</div>;
};

export default Ratings;

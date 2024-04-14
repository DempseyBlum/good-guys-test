import React, { useEffect } from "react";
import "./App.css";
import ReviewsList from "./components/reviewsList/reviewsList";
import { ReviewType } from "./components/reviewsList/reviewsList.types";

function App() {
  const [reviews, setReviews] = React.useState<ReviewType[]>([]);

  const getReviews = () => {
    fetch("./reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data as ReviewType[]);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Good Guys Test</h1>
      </header>
      {reviews.length === 0 ? (
        <p>Loading reviews...</p>
      ) : (
        <ReviewsList reviews={reviews} />
      )}
    </div>
  );
}

export default App;

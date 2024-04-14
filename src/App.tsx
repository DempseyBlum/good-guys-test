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
        setReviews(FilterReviews(data as ReviewType[]));
      });
  };

  function FilterReviews(reviews: ReviewType[]) {
    // Check if the review has required information, without any of these values the review is invalid
    // If there is no title or text then the review is empty and doesn't need to be displayed
    return reviews.filter(
      (review: ReviewType) =>
        review.REVIEW_HDR_ID &&
        (review.REVIEW_TITLE !== "" || review.REVIEW_TEXT !== "") &&
        review.RATING &&
        review.CUSTOMER_NAME !== "" &&
        review.SUBMISSION_DATE !== ""
    );
  }

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

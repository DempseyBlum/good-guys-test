import React, { useEffect } from "react";
import "./App.css";
import ReviewsList from "./components/reviewsList/reviewsList";
import { Review } from "./components/reviewsList/reviewsList.types";

function App() {
  const [reviews, setReviews] = React.useState<Review[]>([]);

  const getReviews = () => {
    fetch("./reviews.json")
      .then((res) => res.json())
      .then((data) => {
        setReviews(data as Review[]);
      });
  };

  useEffect(() => {
    getReviews();
  }, []);

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

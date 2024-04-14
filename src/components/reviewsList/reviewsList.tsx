import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import style from "./reviewsList.module.css";
import { ReviewType } from "./reviewsList.types";
import { useEffect, useState } from "react";
import Review from "../review/review";

enum SortType {
  mostRecent = "mostRecent",
  highestRating = "highestRating",
  lowestRating = "lowestRating",
}

// Paginated reviews list with sorting.
export default function ReviewsList({ reviews }: { reviews: ReviewType[] }) {
  // Sorting variables
  const [sortType, setSortType] = useState(SortType.highestRating);

  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage, setReviewsPerPage] = useState(8);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const [currentReviews, setCurrentReviews] = useState(reviews);

  function NextPage() {
    // Check if there are more reviews to show
    if (!(currentPage * reviewsPerPage >= reviews.length))
      setCurrentPage(currentPage + 1);
  }

  function PreviousPage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function LoadMore() {
    setReviewsPerPage(reviewsPerPage + 10);
  }

  // Sorting logic
  useEffect(() => {
    // Copy the current reviews to avoid mutating the original array
    const reviewsToSort = [...currentReviews];
    switch (sortType) {
      case SortType.mostRecent:
        console.log("mostRecent");
        setCurrentReviews(
          reviewsToSort.sort(
            (a, b) =>
              new Date(b.SUBMISSION_DATE).getTime() -
              new Date(a.SUBMISSION_DATE).getTime()
          )
        );
        break;
      case SortType.highestRating:
        setCurrentReviews(reviewsToSort.sort((a, b) => b.RATING - a.RATING));
        break;
      case SortType.lowestRating:
        setCurrentReviews(reviewsToSort.sort((a, b) => a.RATING - b.RATING));
        break;
    }
  }, [sortType]);

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortType(event.target.value as SortType);
  }

  return (
    <div className={style.reviewsList}>
      <div className={style.reviewsListControls}>
        <div className={style.sortBy}>
          <label>Sort by:</label>
          <select onChange={handleSortChange}>
            <option value={SortType.mostRecent}>Most recent</option>
            <option value={SortType.highestRating}>Highest rating</option>
            <option value={SortType.lowestRating}>Lowest rating</option>
          </select>
        </div>
        <div className={style.pagination}>
          <button onClick={PreviousPage}>Previous</button>
          <button onClick={NextPage}>Next</button>
        </div>
      </div>
      <ul>
        {currentReviews
          .slice(indexOfFirstReview, indexOfLastReview)
          .map((review) => (
            <Review review={review} />
          ))}
      </ul>
      <div className={style.loadMoreWrapper}>
        <button onClick={LoadMore} disabled={reviewsPerPage > reviews.length}>
          Load More
        </button>
      </div>
    </div>
  );
}

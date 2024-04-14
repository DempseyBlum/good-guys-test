import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import style from "./reviewsList.module.css";
import { Review } from "./reviewsList.types";
import { useState } from "react";

enum SortType {
  mostRecent = "mostRecent",
  highestRating = "highestRating",
  lowestRating = "lowestRating",
}

// Paginated reviews list with sorting.
export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  // Pagination variables
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 8;
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  let currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  // Sorting variables
  const [sortType, setSortType] = useState(SortType.highestRating);

  function NextPage() {
    // Check if there are more reviews to show
    if (!(currentPage * reviewsPerPage >= reviews.length))
      setCurrentPage(currentPage + 1);
  }

  function PreviousPage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  return (
    <div className={style.reviewsList}>
      <div className={style.reviewsListControls}>
        <div className={style.sortBy}>
          <label>Sort by:</label>
          <select>
            <option value="mostRecent">Most recent</option>
            <option value="highestRating">Highest rating</option>
            <option value="lowestRating">Lowest rating</option>
          </select>
        </div>
        <div className={style.pagination}>
          <button onClick={PreviousPage}>Previous</button>
          <button onClick={NextPage}>Next</button>
        </div>
      </div>
      <ul>
        {currentReviews.map((review) => (
          <li className={style.reviewWrapper} key={review.REVIEW_HDR_ID}>
            <div className={style.review}>
              <div className={style.reviewHeader}>
                <h2>{review.REVIEW_TITLE}</h2>
                <div className={style.rating}>
                  <FontAwesomeIcon icon={faStar} />
                  <span>{review.RATING}</span>
                </div>
              </div>
              <div className={style.reviewBody}>
                <p>{review.REVIEW_TEXT}</p>
              </div>
              <div className={style.reviewFooter}>
                <p>
                  <span>{review.CUSTOMER_NAME}</span>
                  <span>{review.SUBMISSION_DATE}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

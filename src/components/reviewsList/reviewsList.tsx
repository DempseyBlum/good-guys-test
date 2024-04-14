import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import style from "./reviewsList.module.css";
import { Review } from "./reviewsList.types";

// Paginated reviews list with sorting.
export default function ReviewsList({ reviews }: { reviews: Review[] }) {
  return (
    <div className={style.reviewsList}>
      <ul>
        {reviews.map((review) => (
          <li key={review.REVIEW_HDR_ID}>
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

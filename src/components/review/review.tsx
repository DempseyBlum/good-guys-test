import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import style from "./review.module.css";
import { ReviewType } from "../reviewsList/reviewsList.types";
import { useEffect, useState } from "react";

// Paginated reviews list with sorting.
export default function Review({ review }: { review: ReviewType }) {
  return (
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
          <p className={style.reviewText}>{review.REVIEW_TEXT}</p>
        </div>
        <div className={style.reviewFooter}>
          <p>
            <div>{review.CUSTOMER_NAME}</div>
            <span>{review.SUBMISSION_DATE}</span>
          </p>
        </div>
      </div>
    </li>
  );
}

import React from "react";
import style from "../../styles/coments.module.css";
import { ReviewDataResponse } from "@/types/reviewData";
import StarRating from "../starRating/StarRating";
import TimeStamp from "../timeStamp/TimeStamp";

interface CommenstProps{
  each: ReviewDataResponse
}

const Comments = ({each}: CommenstProps) => {

  const time = each.time;
  
  return (
    <>
      <div className={style.commentContainer}>
        <div className={style.headerSection}>
          <div className={style.metaData}>
            <span id={style.profile}>{each?.userName.charAt(0).toUpperCase()}</span>
            <div className={style.info}>
              <span>{each.userName}</span>
              <StarRating rating={each.rating} />
            </div>
          </div>
          <div className={style.time}><TimeStamp time={time} /></div>
        </div>
        <div className={style.comment}>
          <p>
           {each.message}
          </p>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Comments;

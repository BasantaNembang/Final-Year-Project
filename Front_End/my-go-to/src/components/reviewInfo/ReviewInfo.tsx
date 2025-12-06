import React from "react";
import style from "../../styles/reviewInfo.module.css";
import Comments from "../comment/Comments";
import { FaStar } from "react-icons/fa6";

const ReviewInfo = () => {
  return (
    <>
      <div className={style.reviewInfoContainer}>
        <h3>Student Reviews</h3>
        <div className={style.averageRating}>
          <span>4.6</span>
          <div>
            <span style={{color:"rgb(249, 255, 59)"}}><FaStar /></span>
            <span style={{color:"rgb(249, 255, 59)"}}><FaStar /></span>
            <span style={{color:"rgb(249, 255, 59)"}}><FaStar /></span>
            <span style={{color:"rgb(249, 255, 59)"}}><FaStar /></span>
          </div>
        </div>
        <div>
          <Comments />
          <Comments />
          <Comments />
        </div>
       
      </div>
    </>
  );
};

export default ReviewInfo;

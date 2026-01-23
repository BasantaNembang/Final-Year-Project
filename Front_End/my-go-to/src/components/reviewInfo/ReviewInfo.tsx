"use client";

import React, { useEffect, useState } from "react";
import style from "../../styles/reviewInfo.module.css";
import Comments from "../comment/Comments";
import { getALlCourseReview } from "@/lib/Helper-Two";
import { ReviewDataResponse } from "@/types/reviewData";
import StarRating from "../starRating/StarRating";

interface reviewInfoProps {
  courseId: string;
}

const ReviewInfo = ({ courseId }: reviewInfoProps) => {
  const [commentData, setCommentData] = useState<ReviewDataResponse[] | null>(null);
  const [star, setStar] = useState<number>(0);

  const getAll_Ratings = async () => {
    if (!courseId) return;
    const data = await getALlCourseReview(courseId);
    setCommentData(data);
  };

  useEffect(() => {
    getAll_Ratings();
  }, [courseId]);

  useEffect(() => {
    commentData?.map((each, _) => setStar(each.rating));
  }, [commentData]);

  const calculateAvg = () => {
    if (!commentData) return;
    let num = 0;
    commentData.forEach((each, _) => {
      num += each.rating;
    });
    return num / commentData.length;
  };


  return (
    <>
      <div className={style.reviewInfoContainer}>
        <h3>Student Reviews</h3>
        <span id={style.avg}>{calculateAvg()}</span>
        <div className={style.averageRating}>
          <div style={{marginTop:'2rem'}}>
            <StarRating rating={star} />
          </div>
        </div>
        <div style={{marginTop:'4rem'}}>
          {commentData?.map((each, i) => (
            <Comments each={each} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewInfo;

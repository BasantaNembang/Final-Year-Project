"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/reviews.module.css";
import Comments from "../comment/Comments";
import GiveReviews from "../giveReview/GiveReviews";
import {  ReviewDataResponse } from "@/types/reviewData";
import { getALlCourseReview } from "@/lib/Helper-Two";

interface ReviewsProps {
  course_ID: string;
}

const Reviews = ({ course_ID }: ReviewsProps) => {
  const [allComments, SetALlComments] = useState<ReviewDataResponse[] | []>([]);

  const getAllRATINGS = async (id: string) => {
    const data = await getALlCourseReview(id);
    SetALlComments(data);
  };

  useEffect(() => {
    getAllRATINGS(course_ID);
  }, []);


  const calculateTheAVG = () =>{
   if (allComments.length === 0) return 0;
    let total = 0;
    allComments.forEach((each, _)=>(
      total += each.rating as number
    ))
   return total / allComments.length;
  }
  
  
  return (
    <>
      <div className={styles.ReviewContainer}>
        <div className={styles.avgDiv}>
          <p>
            Average Ratings :<span>{allComments.length} reviews</span>
          </p>
          <p style={{ fontSize: "1.5rem" }}>{calculateTheAVG()}</p>
        </div>
        <GiveReviews SetALlComments={SetALlComments}/>
        {
         allComments.map((each, i) => (
          <Comments each={each} key={i}/>
        ))
        }
      </div>
    </>
  );
};

export default Reviews;

"use client";

import React, { useRef, useState} from "react";
import styles from "../../styles/givereview.module.css";
import { FaStar } from "react-icons/fa6";
import { ReviewData, ReviewDataResponse } from "@/types/reviewData";
import { useHelperContexHook } from "@/context/helperContext";
import { doRatings } from "@/lib/Helper-Service";
import { toast } from "react-toastify";


interface giveReviewProps{
  SetALlComments: React.Dispatch<React.SetStateAction<ReviewDataResponse[]>>
}

const GiveReviews = ({SetALlComments} :giveReviewProps ) => {

  const { streamData, cuurentUser } = useHelperContexHook();

  const TextRef = useRef<HTMLTextAreaElement | null>(null);

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  const [data, setData] = useState<ReviewData>({
        rating: rating,
        message: message,
        courseId: streamData?.courseDto.categoryResponseDTO.course_id as string,
        userId: streamData?.userId as string
  });


  const trackFiled = (e: React.ChangeEvent<HTMLTextAreaElement>) =>{
    const value = e.target.value;
    setData(prev=> ({...prev, message:message, rating: rating}))
    setMessage(value)
  }

  const setTheInstantData = () =>{
     SetALlComments(prev => [...prev, { 
      rid: 0, message: data.message, courseId: streamData?.courseDto.course_id as string, 
      userName: cuurentUser, time: new Date().toISOString(), rating: rating  }]); 
  }


  const submitReview = async() =>{
    if(rating!==0 && message.length > 0){
      setData(prev=> ({...prev, message:message}))
      setRating(rating);
      const flag = await doRatings(data)
      if(flag){
        toast.success("Thank you for your review");
        setTheInstantData();
        setRating(0)
        setHover(0)
        setMessage('')
        if (TextRef.current) {
         TextRef.current.value = '';
        }
      }else{
        toast.info("some thing went wrong please try agian")
      }
    }
  }

  
  return (
    <div className={styles.GiveReviewContainer}>
      <h4>Share Your Reviews</h4>
      <p>Your Ratings</p>
      <div className={styles.ratingsBox}>
        <ul>
          {
            [1, 2, 3 , 4, 5].map((star, _)=>(
              <li key={star}
               onClick={() => setRating(star)}
               onMouseEnter={() => setHover(star)}
               onMouseLeave={() => setHover(0)}>
               <FaStar 
               color={star <= ( hover || rating ) ? "#ffc107" : "rgb(178, 178, 178)"}
               />
              </li>
            ))
          }        
        </ul>
      </div>
      <p>Your Reviews</p>
      <textarea name="" id="" placeholder="Share your thought about this course...." onChange={trackFiled} ref={TextRef}/>
      <button onClick={submitReview}>Submit Review</button>
    </div>
  );
};

export default GiveReviews;
 
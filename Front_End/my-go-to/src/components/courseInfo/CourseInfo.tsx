"use client";

import React, { useState } from "react";
import styles from "../../styles/courseInfo.module.css";
import OverViewInfo from "../overViewInfo/OverViewInfo";
import InstructorInfo from "../instructorInfo/InstructorInfo";
import ReviewInfo from "../reviewInfo/ReviewInfo";
import { dto } from "@/types/courseData";


interface courseInfoProps { 
  Setflag: React.Dispatch<React.SetStateAction<Boolean>>;
  selectedCourse: dto | null
}


const CourseInfo = ({Setflag, selectedCourse}: courseInfoProps) => {

    let [flagOverview, setFlagOverview] =  useState<boolean>(true);
    let [flagInstructor, setFlagInstructor] =  useState<boolean>(false);
    let [flagRatings, setFlagRatings] =   useState<boolean>(false);
  
  
    const openDashBoard = (text: String) => {
      if (text === "overview") {
        setFlagOverview(true)
        setFlagInstructor(false)
        setFlagRatings(false);
      } else if (text === "instructor") {
        setFlagInstructor(true)
        setFlagOverview(false)
        setFlagRatings(false);
      }
      else if(text === "rating"){
        //console.log("Basanta")
        setFlagRatings(true)
        setFlagOverview(false)
        setFlagInstructor(false)
      }
    };


  return (
    <>
      <div className={styles.courseInfoContainer}>
        <div className={styles.infoTitle}>
           <ul>
             <li>  <button onClick={()=>openDashBoard("overview")} style={{color: flagOverview ? 'blue' : 'black'}}>  Overview</button>  { flagOverview && (<span></span>) }</li>
             <li>  <button onClick={()=>openDashBoard("instructor")} style={{color: flagInstructor ? 'blue' : 'black'}}> Instructor</button> { flagInstructor && (<span></span>) } </li>
             {/* <li>  <button onClick={()=>openDashBoard("rating")} style={{color: flagRatings ? 'blue' : 'black'}}> Reviews </button> { flagRatings && (<span></span> ) }</li> */}
             <li><button onClick={()=>openDashBoard("rating")} style={{color: flagRatings ? 'blue' : 'black'}}>Reviews</button> { flagRatings && ( <span></span> ) }  </li>
           </ul>
        </div>
        <hr />
        {/* content..... */}
        {
          flagOverview && ( <OverViewInfo Setflag={Setflag} selectedCourse={selectedCourse}/> )
        }
        {
          flagInstructor && ( <InstructorInfo /> )
        }        
        {
          flagRatings && ( <ReviewInfo /> )
        }        
      </div>
    </>
  );
};

export default CourseInfo;

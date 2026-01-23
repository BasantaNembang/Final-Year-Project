"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/courseInfo.module.css";
import OverViewInfo from "../overViewInfo/OverViewInfo";
import InstructorInfo from "../instructorInfo/InstructorInfo";
import ReviewInfo from "../reviewInfo/ReviewInfo";
import { ResponseCourseDTO } from "@/types/courseData";

interface courseInfoProps { 
  Setflag: React.Dispatch<React.SetStateAction<Boolean>>;
  selectedCourse: ResponseCourseDTO | null
}

const CourseInfo = ({Setflag, selectedCourse}: courseInfoProps) => {

    const [flagOverview, setFlagOverview] =  useState<boolean>(true);
    const [flagInstructor, setFlagInstructor] =  useState<boolean>(false);
    const [flagRatings, setFlagRatings] =   useState<boolean>(false);

    const [teacherID, setTeacherId] = useState<string>('');

    const courseId = selectedCourse?.course_id;
  
    useEffect(()=>{
     setTeacherId(selectedCourse!?.author)
    }, []);

  
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
             <li><button onClick={()=>openDashBoard("rating")} style={{color: flagRatings ? 'blue' : 'black'}}>Reviews</button> { flagRatings && ( <span></span> ) }  </li>
           </ul>
        </div>
        <hr />
        {/* content..... */}
        {
          flagOverview && ( <OverViewInfo Setflag={Setflag} selectedCourse={selectedCourse}/> )
        }
        {
          flagInstructor && ( <InstructorInfo teacherID={teacherID}/> )
        }        
        {
          flagRatings && ( <ReviewInfo courseId={courseId!}/> )
        }        
      </div>
    </>
  );
};

export default CourseInfo;

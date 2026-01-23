"use client";

import React, { useEffect, useRef } from "react";
import styles from "../../styles/mycourse.module.css";
import Link from 'next/link';
import { EnrollmentResponse } from "@/types/enrollmentData";
import { useHelperContexHook } from "@/context/helperContext";
import { createDisscussionRoom } from "@/lib/Chat-Service";

interface MyCourseProps{
  course: EnrollmentResponse
}


const MyCourse = ({course}: MyCourseProps) => {
  //set in context and get in stream page............
  const {setStreamData} = useHelperContexHook();
    const didRun = useRef(false);

  //stuffs for the communications
  const roomId = course.courseDto.course_id;


  useEffect(()=> {
    if (didRun.current) return; // skip second run in dev
    didRun.current = true;    
    const createRoom = async() =>{
     if(!roomId) return; 
     await createDisscussionRoom(roomId)  
   }
   createRoom()
  }, [roomId]);

  
  const setEnrolledCourses = () =>{
     setStreamData(course);   //setting data in a context so, that can be used in stream
  }

  return (
    <>
      <div className={styles.myCourse}>
        <figure>
          <img src={course.courseDto.thumbnail_url} alt="" />
        </figure>
        <h4>{course.courseDto.categoryResponseDTO.subcategory}</h4>
        <p id={styles.author}>by {course.courseDto.author}</p>
        <p id={styles.progress}>Progress</p>
        <progress id={styles.file_progress} value="50" max="100"> 50% </progress>
        <div className={styles.myCourseBTN}>
          <Link href="/stream">
            <button onClick={setEnrolledCourses}>Continue Learning</button> 
          </Link>
        </div>
      </div>
    </>
  );
};

export default MyCourse;


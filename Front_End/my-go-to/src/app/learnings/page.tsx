"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/learningPage.module.css";
import { FaRegPlayCircle } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import MyCourse from "@/components/mycourse/MyCourse";
import Link from 'next/link';
import { getAllEnrollCourse, getUserID } from "@/lib/Helper-Service";
import { EnrollmentResponse } from "@/types/enrollmentData";

const LearningsPage = () => {
  const [flagMyCourse, setFlagMyCourse] = useState<boolean>(true);
  const [flagMyCardCourse, SetFlagMyCardCourse] = useState<boolean>(false);
  const [currentUserId, SetcurrentUserId] = useState<string | null>(null);

  const [enrollCourseData, SetenrollCourseData] = useState<EnrollmentResponse[] | null>(null);


  const openDashBoard = (text: string) => {
    if (text === "myCourse") {
      setFlagMyCourse(true);
      SetFlagMyCardCourse(false);
    }
    if(text === 'myCardCourse'){
      setFlagMyCourse(false);
      SetFlagMyCardCourse(true);      
    }
  };

  const getCurrentUserID = async() =>{
    const response = await getUserID()
    SetcurrentUserId(response);
  }

  useEffect(()=>{
    getCurrentUserID();
  }, []);


  const getAllEnrolledCourse = async() =>{
    if(currentUserId!==null){
       const response = await getAllEnrollCourse(currentUserId);
       SetenrollCourseData(response.enrollData)
    }
  }


  //get the enroll course 
  useEffect(()=>{
     getAllEnrolledCourse()
  }, [currentUserId]);

  

  return (
    <>
      <div className={styles.LearningConatiner}>
        <div className={styles.dashBoard}>
          <div className={styles.dashBoardMetaData}>
            <h3>My Dashboard</h3>
            <p style={{ marginTop: ".7rem" }}>
              Track your progress and continue your journey
            </p>
          </div>
          <div className={styles.dashBoardBTN}>
            <Link href="/course">
              <button>Browse Courses</button>
            </Link>
          </div>
        </div>
        <div className={styles.metaData}>
          <ul>
            <li>
              <span style={{ fontWeight: "bold", fontSize: "1.7rem" }}>{enrollCourseData?.length}</span>
              <span>courses</span>
            </li>
          </ul>
        </div>
        <div className={styles.courses}>
          <div className={styles.titleINFO}>
            <ul>
              <li style={{color: flagMyCourse ? "blue" : "" }}> <FaRegPlayCircle style={{fontSize:'1.2rem', marginLeft:'.5rem', marginTop:'.5rem'}}/> <button onClick={()=>openDashBoard("myCourse")} style={{color: flagMyCourse ? "blue" : "" }}> My Courses </button> {flagMyCourse && ( <span></span> ) }  </li>
              <li style={{color: flagMyCardCourse ? "blue" : "" }}> <HiOutlineShoppingCart style={{fontSize:'1.4rem', marginLeft:'.5rem', marginTop:'.5rem'}}/> <button onClick={()=>openDashBoard("myCardCourse")} style={{color: flagMyCardCourse ? "blue" : "" }}> Shopping Cart </button> {flagMyCardCourse && ( <span></span> ) }  </li>
            </ul>
          </div>

          {/*  */}
          <div className={styles.dynamicContent}>
             {
              flagMyCourse && (
              <div className={styles.myCourseContainer}>
                <h3>Continue Learning</h3>
                {
                  enrollCourseData?.length === 0 ?( <span>You do`t have done enroll course yet</span>) : undefined
                }                
                {
                  enrollCourseData?.map((course, i)=>(
                     <MyCourse course={course} key={i}/> 
                  ))
                }
              </div> )
             }
          </div>
        </div>
      </div>
    </>
  );
};

export default LearningsPage;

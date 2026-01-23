"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/coursePage.module.css";
import FilterSection from "@/components/filter/FilterSection";
import CourseContainer from "@/components/courseContainer/CourseContainer";
import CourseInfo from "@/components/courseInfo/CourseInfo";
import { ResponseCourseDTO } from "@/types/courseData";
import { useHelperContexHook } from "@/context/helperContext";


const CoursePage = () => {
  const [flag, Setflag] = useState<Boolean>(true);
  const [Courses, SetCourses] = useState<ResponseCourseDTO[] | null>(null);
  const [selectedCourse, SetSelectedCourse] = useState<ResponseCourseDTO | null>(null);

  const { setIsPrivate } = useHelperContexHook();

  useEffect(()=>{  //to make the navbar normal created by payment.........
   setIsPrivate(false)
  }, []);


  return (
    <>
      <div className={styles.coursePageContainer}>
        <div className={styles.header}>
          <span>All Courses</span>
        </div>
        {flag ? (
          <div className={styles.container}>
            <FilterSection SetCourses={SetCourses}/>
            <CourseContainer Setflag={Setflag} SetSelectedCourse={SetSelectedCourse} Courses={Courses} SetCourses={SetCourses}/>
          </div>
        ) : (  //details of courses
            <CourseInfo Setflag={Setflag} selectedCourse={selectedCourse}/>
        )}
      </div>
    </>
  );
};

export default CoursePage;

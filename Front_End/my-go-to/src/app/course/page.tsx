"use client";

import React, { useState } from "react";
import styles from "../../styles/coursePage.module.css";
import FilterSection from "@/components/filter/FilterSection";
import CourseContainer from "@/components/courseContainer/CourseContainer";
import CourseInfo from "@/components/courseInfo/CourseInfo";
import { dto } from "@/types/courseData";

const CoursePage = () => {
  let [flag, Setflag] = useState<Boolean>(true);
  let [selectedCourse, SetSelectedCourse] = useState<dto | null>(null);


  return (
    <>
      <div className={styles.coursePageContainer}>
        <div className={styles.header}>
          <span>All Courses</span>
        </div>
        {flag ? (
          <div className={styles.container}>
            <FilterSection />
            <CourseContainer Setflag={Setflag} SetSelectedCourse={SetSelectedCourse}/>
          </div>
        ) : (  //details 
            <CourseInfo Setflag={Setflag} selectedCourse={selectedCourse}/>
        )}
      </div>
    </>
  );
};

export default CoursePage;

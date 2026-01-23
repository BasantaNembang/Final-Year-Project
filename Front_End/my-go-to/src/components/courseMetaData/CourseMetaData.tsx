"use client";

import React from "react";
import styles from "../../styles/courseMetaData.module.css";
import { useHelperContexHook } from "@/context/helperContext";

const CourseMetaData = () => {

  const { streamData } = useHelperContexHook();

  //to prevent from refresh data lekage use LOCALSTORAGE

  
  return (
    <>
      <div className={styles.courseMetaDataContainer}>
        <h3>About this Course</h3>
        <p>
         {streamData!.courseDto.description}
        </p>
        <h3 id={styles.noteHeader}>What you will learn</h3>
        <ul>
          {
            streamData!.courseDto.requirements.map((each, i)=>(
             <li key={i}>{each}</li>
            ))
          }
        </ul>
        <h3 id={styles.objHeader}>Objectives</h3>
        <ul>
          {
            streamData!.courseDto.objectives.map((each, i)=>(
             <li key={i}>{each}</li>
            ))
          }
        </ul>
      </div>
    </>
  );
};

export default CourseMetaData;

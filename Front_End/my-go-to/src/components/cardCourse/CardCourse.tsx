"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/cardCourse.module.css";
import { ResponseCourseDTO } from "@/types/courseData";
import { TeacherDto } from "@/types/usersData";
import { getTeacherDetails } from "@/lib/Auth-Service";

interface courseProps{
  Setflag:  React.Dispatch<React.SetStateAction<Boolean>>,
  each: ResponseCourseDTO
}


const CardCourse = ({Setflag, each}: courseProps) => {

  const [teacherDetails, SetTeacherDetails] = useState<TeacherDto | null>(null);


  const getTeacherInfo = async(userId: string) =>{
     const response = await getTeacherDetails(userId)
     SetTeacherDetails(response)
  }
  

  useEffect(()=>{
    getTeacherInfo(each.author);
  }, [each.author]);


  const title = each.categoryResponseDTO.subcategory;

  
  return (
    <>
      <div className={styles.courseContainer}>
        <figure>
          <img
            src={each.thumbnail_url}
            alt=""
          />
        </figure>
        <div className={styles.infoSections}>
          <div id={styles.category}>{each.categoryResponseDTO.category.toUpperCase()}</div>
          <p>{title.charAt(0).toUpperCase() + title.slice(1)}</p>
          <p id={styles.author}>{teacherDetails?.username}</p>
          <div className={styles.metaData}>
            <ul>
              <li>{each.time} hrs</li>
              <li>{each.level}</li>
            </ul>
          </div>
          <div className={styles.price}>
              <span style={{fontWeight:"bold"}}>Rs {each.price}</span>
              <span><del>Rs {each.price + 750 }</del></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCourse;

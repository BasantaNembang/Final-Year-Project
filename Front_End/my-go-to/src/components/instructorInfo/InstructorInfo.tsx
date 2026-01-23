"use client";

import React, { useState, useEffect } from "react";
import style from '../../styles/instructor.module.css'
import { TeacherDto } from "@/types/usersData";
import { getTeacherDetails } from "@/lib/Auth-Service";

interface instructorInfoProps{
  teacherID: string
}

const InstructorInfo = ({teacherID}: instructorInfoProps) => {

  const [teacherDetails, SetTeacherDetails] = useState<TeacherDto | null>(null);
   
  const getTeacherInfo = async(userId: string) =>{
      const response = await getTeacherDetails(userId)
      SetTeacherDetails(response)
  }
     
  useEffect(()=>{
     getTeacherInfo(teacherID);
  }, [teacherID]);


  return (
    <div className={style.instructorContainer}>
      <h3>Your Instructor</h3>
      <div className={style.instuctorBOX}>
        <div className={style.imageSectoin}>
         <figure>
          <img src={teacherDetails?.imageUrl} alt="" />
         </figure>
        </div>
        <div className={style.informationSection}>
          <span >{teacherDetails?.username}</span>
          <span>{teacherDetails?.job}</span>
          <span>{teacherDetails?.background}</span>
        </div>
      </div>
    </div>
  )
}

export default InstructorInfo

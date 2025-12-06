"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/courseContainer.module.css";
import CardCourse from "../cardCourse/CardCourse";
import { CiSearch } from "react-icons/ci";
import { getCourses } from "@/api/Course-Backend";
import { dto } from "@/types/courseData";
import { useAuthContexHook } from "@/context/authContext";

interface courseContainerProps {
  Setflag: React.Dispatch<React.SetStateAction<Boolean>>;
  SetSelectedCourse: React.Dispatch<React.SetStateAction<dto | null>>
}

const CourseContainer = ({ Setflag, SetSelectedCourse }: courseContainerProps) => {
  let [Courses, SetCourses] = useState<dto[] | null>(null);

   
  //send the jwtToken as well for TESTING PURPOSE
  const  { refreshToken } = useAuthContexHook();

  useEffect(() => {
    const fecthAllCourses = async () => {
      const data = await getCourses();
      SetCourses(data);
    };
    fecthAllCourses();
  }, []);

  const showCourseINFO = (data: dto) => {
    Setflag((prev) => !prev)
    SetSelectedCourse(data);   //set the selected data here
  };

  
  return (
    <>
      <div className={styles.courseContainer}>
        <div className={styles.filterText}>
          <CiSearch id={styles.FilterICON} />{" "}
          <input type="text" name="" id="" placeholder="Place for anything" />
        </div>
        <div className={styles.courseList} >
          {
            Courses?.map((each, i)=>(
              <div onClick={()=>showCourseINFO(each)} key={i} >
                 <CardCourse Setflag={Setflag}  each={each}/>
              </div>            
            ))
          }
        </div>
      </div>
    </>
  );
};

export default CourseContainer;


"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/courseContainer.module.css";
import CardCourse from "../cardCourse/CardCourse";
import { CiSearch } from "react-icons/ci";
import { ResponseCourseDTO } from "@/types/courseData";
import { getCourses, getCoursesByName } from "@/lib/Course-Backend";

interface courseContainerProps {
  Setflag: React.Dispatch<React.SetStateAction<Boolean>>;
  SetSelectedCourse: React.Dispatch<React.SetStateAction<ResponseCourseDTO | null>>,
  Courses: ResponseCourseDTO[] | null
  SetCourses: React.Dispatch<React.SetStateAction<ResponseCourseDTO[] | null>>
}

const CourseContainer = ({ Setflag, SetSelectedCourse, Courses, SetCourses }: courseContainerProps) => {

  const [seacrhQuery, setSeacrhQuery ] = useState<string>('');

  const showCourseINFO = (data: ResponseCourseDTO) => {
    Setflag((prev) => !prev)
    SetSelectedCourse(data);   //set the selected data here
  }
  
  const fecthAllCourses = async () => {
    const data = await getCourses();
    SetCourses(data);
  };

  useEffect(() => {
    fecthAllCourses();
   }, []);

  const getBySearch = (e: React.ChangeEvent<HTMLInputElement> ) =>{
    if(e.target.value){
      setSeacrhQuery(e.target.value);
    }
    else if(e.target.value === ''){
       fecthAllCourses();
    }
  }

  const getCourse = async() =>{
   if(!seacrhQuery) return;
    const data = await getCoursesByName(seacrhQuery);
    SetCourses(data)
  }

  useEffect(()=>{
    getCourse();
  }, [seacrhQuery]);
  

  return (
    <>
      <div className={styles.courseContainer}>
        <div className={styles.filterText}>
          <CiSearch id={styles.FilterICON} />
          <input type="text" name="" id="" placeholder="Place for anything" onChange={getBySearch}/>
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


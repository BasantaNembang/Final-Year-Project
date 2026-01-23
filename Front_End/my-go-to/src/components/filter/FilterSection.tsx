"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/filterSection.module.css";
import { CiFilter } from "react-icons/ci";
import FilterModal from "@/modal/FilterModal";
import { ResponseCourseDTO } from "@/types/courseData";
import { getCourses, getCoursesByCategory, getCoursesByLevel, getCoursesByPrice } from "@/lib/Course-Backend";

interface filterSectionProps {
  SetCourses: React.Dispatch<React.SetStateAction<ResponseCourseDTO[] | null>>
}

const FilterSection = ({ SetCourses }: filterSectionProps) => {

 const [isMobile, SetMobile] = useState<Boolean>(false);
 const [flag, Setflag] = useState<Boolean>(false);


  useEffect(() => {
   if(window.innerWidth < 450){
      SetMobile(true)
   }
  }, []);

  const showFilter = () =>{
    Setflag((prev)=>!prev);
  }

  const getALLCourse = async() =>{
    const data = await getCourses();
    SetCourses(data)  
  }

  const filterCategory = async(category: string) =>{
    const data = await getCoursesByCategory(category);
    SetCourses(data)
  }
 
  const filterLevel = async(level: string) =>{
    const data = await getCoursesByLevel(level);
    SetCourses(data)
  }

  const filterPrice = async(price: number) =>{
    const data = await getCoursesByPrice(price);
    SetCourses(data)
  }

  return <>
     <div className={styles.filterContainer}>
      {/* <CiFilter/> */}
        <header onClick={showFilter}>Filters { isMobile && (<CiFilter />) }   </header>
        <div className={styles.categorySection} style={{ display: isMobile ? 'none' : undefined }}>
          <p>Category</p>
          <button onClick={getALLCourse}>All Categories</button>
          <button onClick={()=>filterCategory("bussiness")}>BUSINESS</button>
          <button onClick={()=>filterCategory("it")}>IT</button>
          <button onClick={()=>filterCategory("medicine")}>MEDICINE</button>
          <button onClick={()=>filterCategory("design")}>DESIGN</button>
          <button onClick={()=>filterCategory("marketing")}>MARKETING</button>
          <button onClick={()=>filterCategory("music")}>MUSIC</button>
          <button onClick={()=>filterCategory("photo")}>PHOTO</button>
        </div>
        <div className={styles.categorySection} style={{ display: isMobile ? 'none' : undefined }}>
          <p>Level</p>
          <button onClick={getALLCourse}>All Level</button>
          <button onClick={()=>filterLevel("EASY")}>EASY</button>
          <button onClick={()=>filterLevel("MEDIUM")}>MEDIUM</button>
          <button onClick={()=>filterLevel("HARD")}>HARD</button>
        </div>
        <div className={styles.categorySection} style={{ display: isMobile ? 'none' : undefined }} >
          <p>Price</p>
          <button onClick={getALLCourse}>All Price</button>
          <button onClick={()=>filterPrice(0)}>FREE</button>
          <button onClick={()=>filterPrice(999)}>Below 1000</button>
          <button onClick={()=>filterPrice(4999)}>Between 1000 & 5000</button>
          <button onClick={()=>filterPrice(5001)}>Above 5000</button>
        </div>        
     </div>
     {/*  */}
    { flag && <FilterModal Setflag={Setflag}/>}
  </>;
};

export default FilterSection;

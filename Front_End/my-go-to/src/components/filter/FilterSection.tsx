"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/filterSection.module.css";
import { CiFilter } from "react-icons/ci";
import FilterModal from "@/modal/FilterModal";


const FilterSection = () => {

 let [isMobile, SetMobile] = useState<Boolean>(false);
 let [flag, Setflag] = useState<Boolean>(false);


  useEffect(() => {
   if(window.innerWidth < 450){
      SetMobile(true)
   }
  }, []);

  const showFilter = () =>{
    Setflag((prev)=>!prev);
  }
 
 
  return <>
     <div className={styles.filterContainer}>
      {/* <CiFilter/> */}
        <header onClick={showFilter}>Filters { isMobile && (<CiFilter />) }   </header>
        <div className={styles.categorySection} style={{ display: isMobile ? 'none' : undefined }}>
          <p>Category</p>
          <button>All Categories</button>
          <button>BUSINESS</button>
          <button>IT</button>
          <button>MEDICINE</button>
          <button>DESIGN</button>
          <button>MARKETING</button>
          <button>MUSIC</button>
          <button>PHOTO</button>
        </div>
        <div className={styles.categorySection} style={{ display: isMobile ? 'none' : undefined }}>
          <p>Level</p>
          <button>All Level</button>
          <button>EASY</button>
          <button>MEDUIM</button>
          <button>HARD</button>
        </div>
        <div className={styles.categorySection} style={{ display: isMobile ? 'none' : undefined }} >
          <p>Price</p>
          <button>All Price</button>
          <button>FREE</button>
          <button>Below 1000</button>
          <button>Between 1000 & 50000</button>
          <button>Above 50000</button>
        </div>        
     </div>
     {/*  */}
    { flag && <FilterModal Setflag={Setflag}/>}
  </>;
};

export default FilterSection;

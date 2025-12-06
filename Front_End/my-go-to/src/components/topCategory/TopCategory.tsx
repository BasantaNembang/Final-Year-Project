import React from "react";
import styles from "../../styles/topcategory.module.css";
import { BiExpandHorizontal } from "react-icons/bi";
import { IoBrushOutline } from "react-icons/io5";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { IoIosRadio } from "react-icons/io";
import { TbPhoto } from "react-icons/tb";
import { CiMusicNote1 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FaChalkboardTeacher } from "react-icons/fa";

const TopCategory = () => {
  return (
    <>
      <div className={styles.topCategoryContainer}>
        <div className={styles.heading}>
          <h2>Explore Top Categories</h2>
        </div>
        <div className={styles.info}>
          <p>Choose from thousands of Courses in trending topics</p>
        </div>
        <div className={styles.contentSection}>
          <div className={styles.eachContent}>
            <span><BiExpandHorizontal id={styles.contentIconID}/></span>
            <span>Development</span>
          </div>
          <div className={styles.eachContent}>
            <span><IoBrushOutline id={styles.contentIconID}/></span>
            <span>Design</span>
          </div>
          <div className={styles.eachContent}>
            <span><LiaBusinessTimeSolid id={styles.contentIconID}/></span>
            <span>Business</span>
          </div>
          <div className={styles.eachContent}>
            <span><IoIosRadio id={styles.contentIconID}/></span>
            <span>Marketing</span>
          </div>
          <div className={styles.eachContent}>
            <span><TbPhoto id={styles.contentIconID}/></span>
            <span>Photo</span>
          </div>
          <div className={styles.eachContent}>
            <span><CiMusicNote1 id={styles.contentIconID}/></span>
            <span>Music</span>
          </div>
          <div className={styles.eachContent}>
            <span><CiHeart id={styles.contentIconID}/></span>
            <span>Health</span>
          </div>
          <div className={styles.eachContent}>
            <span><FaChalkboardTeacher id={styles.contentIconID}/></span>
            <span>Learning</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopCategory;

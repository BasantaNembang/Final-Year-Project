import React from "react";
import styles from "../../styles/cardCourse.module.css";
import { dto } from "@/types/courseData";

interface courseProps{
  Setflag:  React.Dispatch<React.SetStateAction<Boolean>>,
  each: dto
}


const CardCourse = ({Setflag, each}: courseProps) => {
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
          <p>{each?.title}</p>
          <p id={styles.author}>Basanta Nembang</p>
          <div className={styles.metaData}>
            <ul>
              <li>52 hrs</li>
              <li>MEDUIM</li>
            </ul>
          </div>
          <div className={styles.price}>
              <span style={{fontWeight:"bold"}}>Rs 1999</span>
              <span><del>Rs 1999</del></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCourse;

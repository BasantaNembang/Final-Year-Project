import React from "react";
import styles from "../../styles/featureCourses.module.css";
import { IoIosStar } from "react-icons/io";
import { Course } from "@/data/FeatureDemoData";


interface course{
  eachData: Course
}


const FeatureCourses = ({eachData}: course) => {
  return (
    <>
      <div className={styles.courseItem}>
        <figure>
          <img
            src={eachData.image_url}
            alt=""
          />
        </figure>
        <div className={styles.course}>
          <h4>{eachData.course}</h4>
        </div>
        <div className={styles.author}>
          <p>{eachData.creater}</p>
        </div>
        <div className={styles.ratings}>
          <span>
            {" "}
            <IoIosStar id={styles.star}/>
          </span>
          <span> {eachData.ratings}</span>
        </div>
        <div className={styles.time}>
          {eachData.time!=0 && <span>{eachData.time} hrs</span>}
        </div>
        <div className={styles.price}>
          <span>
            <strong>RS: {eachData.course_price}</strong>
          </span>
          <span>
            <del>RS: {eachData.course_price+70}</del>
          </span>
        </div>
      </div>
    </>
  );
};

export default FeatureCourses;

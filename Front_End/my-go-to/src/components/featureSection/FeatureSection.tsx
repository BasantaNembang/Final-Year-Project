import React from "react";
import styles from "../../styles/featureSection.module.css";
import FeatureCourses from "../featureCourses/FeatureCourses";
import data from "@/data/FeatureDemoData";

const FeatureSection = () => {
  return (
    <>
      <div className={styles.featureContainer}>
        <div className={styles.featureInfo}>
          <div className={styles.freatureHeaderInfo}>
            <h3>Featured Courses</h3>
            <p>Most popular courses this month</p>
          </div>
          <div className={styles.freatureHeaderBtn}>
            <button>View All Courses</button>
          </div>
        </div>
        <div className={styles.featureCourses}>
          {
           data.map((eachData, index)=>(
            <FeatureCourses eachData={eachData} key={index} />
           ))
          }
        </div>
      </div>
    </>
  );
};

export default FeatureSection;

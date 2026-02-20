import React from "react";
import styles from "../../styles/heroSection.module.css";

const HeroSection = () => {
  return (
    <>
      <div className={styles.heroContainer}>
        <div className={styles.info}>
          <div className={styles.headingSection}>
            <h1>Learn Without Limits</h1>
          </div>
          <div className={styles.infoSection}>
            <p>
              Master new skills with expert-led courses. Join millions of
              learners advancing their careers and passions.
            </p>
          </div>
          <div className={styles.btnSection}>
            <button>Start Learning</button>
            <button>Become an instructor</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

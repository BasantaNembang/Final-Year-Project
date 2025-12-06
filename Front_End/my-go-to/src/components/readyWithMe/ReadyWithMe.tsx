import React from "react";
import styles from "../../styles/readyWithMe.module.css";

const ReadyWithMe = () => {
  return (
    <>
      <div className={styles.readyContainer}>
        <div className={styles.header}>
          <h3>Ready to start learning?</h3>
        </div>
        <div className={styles.info}>
          <p>
            Join millions of learners and start building the skills you need to
            advance
          </p>
          <span>your career</span>
        </div>
        <div className={styles.btn}>
          <button>Browse Courses</button>
          <button>Sign Up Free</button>
        </div>
      </div>
    </>
  );
};

export default ReadyWithMe;

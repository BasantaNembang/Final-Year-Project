import React from "react";
import styles from "../../styles/choose.module.css";
import { MdSlowMotionVideo } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { FiMessageCircle } from "react-icons/fi";
import { PiCertificate } from "react-icons/pi";

const WhyChoose = () => {
  return (
    <>
      <div className={styles.chooseContainer}>
        <div className={styles.heading}>
          <h2>Why Choose MyGoTo?</h2>
        </div>
        <div className={styles.info}>
          <p>Everything you need for an exceptional learning experience</p>
        </div>

        <div className={styles.features}>
          <div className={styles.featureDiv}>
            <div className={styles.featureDivIcon}>
              <span>
                {" "}
                <MdSlowMotionVideo id={styles.videoIcon} />{" "}
              </span>
            </div>
            <div className={styles.featureDivHeading}>
              <h4>Interactive Learning</h4>
            </div>
            <div className={styles.featureDivInfo}>
              <p>
                Engage with video lectures, quizzes and
                <span> hands-on projects</span>
              </p>
            </div>
          </div>
          <div className={styles.featureDiv}>
            <div className={styles.featureDivIcon}>
              <span style={{backgroundColor:"#ceffce"}}>
                {" "}
                <IoPeopleOutline id={styles.videoIcon} style={{color:"green"}}/>{" "}
              </span>
            </div>
            <div className={styles.featureDivHeading}>
              <h4>Expert Instructors</h4>
            </div>
            <div className={styles.featureDivInfo}>
              <p>
                Learn from industry professionals and
                <span>thought leaders</span>
              </p>
            </div>
          </div>
          <div className={styles.featureDiv}>
            <div className={styles.featureDivIcon}>
              <span style={{backgroundColor:"#e8e4c1"}}>
                {" "}
                <FiMessageCircle id={styles.videoIcon} style={{color:"#807823"}}/>{" "}
              </span>
            </div>
            <div className={styles.featureDivHeading}>
              <h4>Community Support</h4>
            </div>
            <div className={styles.featureDivInfo}>
              <p>
                Connect with peers and get help when 
                <span>you need it</span>
              </p>
            </div>
          </div>
          <div className={styles.featureDiv}>
            <div className={styles.featureDivIcon}>
              <span style={{backgroundColor:'#ffb0b0'}}>
                {" "}
                <PiCertificate id={styles.videoIcon} style={{color:"red"}}/>{" "}
              </span>
            </div>
            <div className={styles.featureDivHeading}>
              <h4>Certificates</h4>
            </div>
            <div className={styles.featureDivInfo}>
              <p  id={styles.certificatePara}>
                Earn certificates to showcase your
                <span>achievements</span>
              </p>
            </div>
          </div>                      
        </div>
      </div>
    </>
  );
};

export default WhyChoose;

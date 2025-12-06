import React from "react";
import styles from "../../styles/footer.module.css";
import { PiGraduationCapLight } from "react-icons/pi";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Fotter = () => {
  return (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.upperFotter}>
          <div className={styles.infoSection}>
            <div className={styles.logoSection}>
              {" "}
              <PiGraduationCapLight id={styles.logo} />
              <span>MyGoTO</span>
            </div>
            <div className={styles.information}>
              Empowering learners worldwide with quality education and
              professional development courses.
            </div>
            <div className={styles.socialMedia}>
              <ul>
                <li><FaFacebookF /></li>
                <li><FaTwitter /></li>
                <li><FaLinkedinIn /></li>
                <li><AiFillInstagram /></li>
              </ul>
            </div>
          </div>
          <div className={styles.infoLearn}>
            <h3>Learn</h3>
              <ul>
                <li>Browse Courses</li>
                <li>Categories</li>
                <li>My Learning</li>
                <li>Certificates</li>
              </ul>
          </div>
          <div className={styles.infoTech}>
            <h3>Teach</h3>
              <ul>
                <li>Become Instructor</li>
                <li>Instructor Dashboard</li>
                <li>Teaching Resources</li>
                <li>Community</li>
              </ul>
          </div>
          <div className={styles.infoSupport}>
            <h3>Support</h3>
              <ul>
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
          </div>
        </div>
        <div>
          <hr id={styles.fotterLine}/>
        </div>
        <div className={styles.lowerFotter}>
          <span>
            {  new Date().getFullYear()  } MyGoTo. All rights reserved. Empowering education worldwide.
          </span>
        </div>
      </div>
    </>
  );
};

export default Fotter;

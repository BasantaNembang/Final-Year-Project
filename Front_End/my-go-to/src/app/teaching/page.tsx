"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/teachingPage.module.css";
import TeacherHeroSec from "@/components/teacherHeroSection/TeacherHeroSec";
import ReasonToStrat from "@/components/teacherReason/ReasonToStrat";
import Begin from "@/components/teacherBegin/Begin";
import Instructor from "@/components/teacherInstructor/Instructor";
import TeacherSignUpModel from "@/modal/TeacherAuthModel";

const TeachingPage = () => {
  let [flag, SetFlag] = useState<Boolean>(false);

  useEffect(() => {
    if (flag === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [flag]);

  return (
    <>
      <div className={styles.teachingPageContainer}>
        <TeacherHeroSec />
        <ReasonToStrat />
        <Begin />
        <Instructor SetFlag={SetFlag} />

        {/* model */}
        {flag && <TeacherSignUpModel flag={flag} SetFlag={SetFlag} />}
      </div>
    </>
  );
};

export default TeachingPage;

"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/teachingPage.module.css";
import TeacherHeroSec from "@/components/teacherHeroSection/TeacherHeroSec";
import ReasonToStrat from "@/components/teacherReason/ReasonToStrat";
import Begin from "@/components/teacherBegin/Begin";
import Instructor from "@/components/teacherInstructor/Instructor";
import TeacherSignUpModel from "@/modal/TeacherAuthModel";

const TeachingPage = () => {
  const [flag, SetFlag] = useState<Boolean>(false);

  useEffect(() => {
    if (flag === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Always restore scroll
    };
  }, [flag]);

  return (
    <>
      <div className={styles.teachingPageContainer}>
        <TeacherHeroSec SetFlag={SetFlag} />
        <ReasonToStrat />
        <Begin />
        <Instructor SetFlag={SetFlag} />

        {/* model */}
        {flag && <TeacherSignUpModel SetFlag={SetFlag} />}

      </div>
    </>
  );
};

export default TeachingPage;






"use client";

import React, { useState } from "react";
import styles from "../styles/teacherAuthModel.module.css"
import SignUp from "@/components/form/Teacher/SignUp";
import LogIn from "@/components/form/Teacher/LogIn";


interface teacherSignUpProps {
  SetFlag: React.Dispatch<React.SetStateAction<Boolean>>
}


const TeacherAuthModel = ({  SetFlag }: teacherSignUpProps) => {

  const [authflag, SetAuthFlag] = useState<Boolean>(true);


  const check = () => {
    SetFlag(false)
  }

  // onClick={check}
  return (
    <>
      <div className={styles.editModal_wrapper} >
        <div className={styles.editModal_conatiner} >
          {/* signupSection and loginSection */}
          {
            authflag ? (
              <SignUp SetFlag={SetFlag} SetAuthFlag={SetAuthFlag} />
            ) :
              (
                <LogIn SetFlag={SetFlag} SetAuthFlag={SetAuthFlag} />
              )
          }

        </div>
      </div>
    </>
  );
};

export default TeacherAuthModel;

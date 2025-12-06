"use client";

import React, { useState } from "react";
import styles from "../../styles/authPage.module.css";
import SignUp from "@/components/form/Student/SignUp";
import LogIn from "@/components/form/Student/LogIn";

const AuthPage = () => {

  const [authflag, SetAuthFlag] = useState<Boolean>(true);

  return (
    <>
      <div className={styles.authContainer}>
       {
        authflag? ( <SignUp SetAuthFlag={SetAuthFlag}/>  ) :
        ( <LogIn SetAuthFlag={SetAuthFlag}/> )
       }
      </div>
    </>
  );
};

export default AuthPage;

"use client";

import React, { useState } from "react";
import style from "../../styles/teacherBegin.module.css";
import Plan from "./Plan";
import Record from "./Record";
import Launch from "./Launch";

const Begin = () => {

  const [plan, setPlan] = useState<boolean>(true);
  const [record, setRecord] = useState<boolean>(false);
  const [launch, setLaunch] = useState<boolean>(false);

  const openSection = (text: String) => {

    if (text === "plan") {
      setPlan(true);
      setRecord(false);
      setLaunch(false);
    } else if (text === "record") {
      setRecord(true);
      setLaunch(false);
      setPlan(false);
    }
    else if (text === "launch") {
      setLaunch(true);
      setPlan(false);
      setRecord(false);
    }
  };

  return (
    <>
      <div className={style.beginContainer} >
        <h3>How to begin</h3>
        <ul>
          <li><button onClick={() => openSection("plan")} style={{ color: plan ? "black" : undefined }}>Plan your curriculum</button> { plan && (<span></span>) }</li>                                 
          <li><button onClick={() => openSection("record")} style={{ color: record ? "black" : undefined }}>Record your video</button> { record && (<span></span>) }</li>  
          <li><button onClick={() => openSection("launch")} style={{ color: launch ? "black" : undefined }}>Launch your course</button> { launch && (<span></span>) }</li>  
        </ul>

        <div>
          {
            plan && <Plan />
          }
          {
            record && <Record />
          }
          {
            launch && <Launch/>
          }
        </div>
      </div>
    </>
  );
};

export default Begin;

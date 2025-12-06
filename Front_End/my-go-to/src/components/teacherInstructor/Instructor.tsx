import React from "react";
import style from "../../styles/teacherInstructor.module.css";

interface intructorProps{
  SetFlag: React.Dispatch<React.SetStateAction<Boolean>>
}


const Instructor = ({SetFlag}: intructorProps) => {
  return (
    <div className={style.instructorContainer} style={{height:"20rem"}}>
      Instructor
      <button onClick={()=>SetFlag(prev=>!prev)}>Get started</button>
    </div>
  );
};

export default Instructor;

import React from "react";
import style from "../../styles/teacherInstructor.module.css";

interface intructorProps {
  SetFlag: React.Dispatch<React.SetStateAction<Boolean>>
}


const Instructor = ({ SetFlag }: intructorProps) => {
  return (
    <div className={style.instructorContainer} >
      <h3>Become an instructor today</h3>
      <p>Join one of the world`s largest online learning
        marketplaces.</p>
      <div className={style.btnContainer} >
        <button onClick={() => SetFlag(prev => !prev)}>Get started</button>
      </div>
    </div>
  );
};

export default Instructor;

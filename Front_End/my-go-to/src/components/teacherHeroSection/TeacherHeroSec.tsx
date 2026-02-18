import React from "react";
import style from "../../styles/teacherHeroSection.module.css";


interface teacherHerpProps {
  SetFlag: React.Dispatch<React.SetStateAction<Boolean>>
}


const TeacherHeroSec = ({ SetFlag }: teacherHerpProps) => {
  return (
    <>
      <div className={style.teacherHeroSectionContainer} >
        <div className={style.teacherINFO}>
          <h2>Come teach
            with us
          </h2>
          <p>Become an instructor and changes lives</p>
          <button onClick={()=>SetFlag(true)}>Get started</button>
        </div>
        <div className={style.teacherPICTURE}>
          <figure>
            <img src="./teacherImage.png" alt="image" />
          </figure>
        </div >
      </div >
    </>
  );
};

export default TeacherHeroSec;



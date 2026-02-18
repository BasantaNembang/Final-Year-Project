import React from "react";
import style from "../../styles/teacherReason.module.css";

const ReasonToStrat = () => {
  return (
    <>
      <div className={style.reasonContainerMain} >
        <h3>So many reasons to start </h3>
        <div className={style.reasonContainer}>
          <div className={style.reasonWhy} >
            <figure>
              <img src="./teachings.png" alt="" />
            </figure>
            <span>Tech your way
            </span>
            <p>Publish the course you want,
              and always have control of your own
              content</p>
          </div>
          <div className={style.reasonWhy} >
            <figure>
              <img src="./idea.png" alt="" />
            </figure>
            <span>Tech your way
            </span>
            <p>Publish the course you want,
              and always have control of your own
              content</p>
          </div>

          <div className={style.reasonWhy} >
            <figure>
              <img src="./trophy.png" alt="" />
            </figure>
            <span>Tech your way
            </span>
            <p>Publish the course you want,
              and always have control of your own
              content</p>
          </div>

        </div>
        <div className={style.border}></div>
      </div>
    </>
  );
};

export default ReasonToStrat;

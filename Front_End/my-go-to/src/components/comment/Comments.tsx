import React from "react";
import style from "../../styles/coments.module.css";
import { FaStar } from "react-icons/fa6";

const Comments = () => {
  return (
    <>
      <div className={style.commentContainer}>
        <div className={style.headerSection}>
          <div className={style.metaData}>
            <span id={style.profile}>M</span>
            <div className={style.info}>
              <span>Basanta Nembang</span>
              <span style={{marginTop:".5rem", color:"rgb(249, 255, 59)"}}><FaStar /></span>
            </div>
          </div>
          <div className={style.time}>2 hours ago</div>
        </div>
        <div className={style.comment}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum
            repellat provident consequuntur.
          </p>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Comments;

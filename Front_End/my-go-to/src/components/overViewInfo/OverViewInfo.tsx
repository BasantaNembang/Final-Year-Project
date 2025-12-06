"use client";

import React from "react";
import styles from "../../styles/overView.module.css";
import { TiTick } from "react-icons/ti";
import { FaArrowRight } from "react-icons/fa";
import { dto } from "@/types/courseData";
import { SiTicktick } from "react-icons/si";
import { useRouter } from "next/navigation";


interface overViewProps { 
  Setflag: React.Dispatch<React.SetStateAction<Boolean>>;
  selectedCourse: dto | null
}


const OverViewInfo = ({Setflag, selectedCourse}: overViewProps) => {

  const router =  useRouter();
  var CryptoJS = require("crypto-js");

  const secretKEY = process.env.NEXT_PUBLIC_MY_SECRECT_KEY;

    const goToPayment = (courseId : string | undefined, price : number | undefined) =>{
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(courseId), secretKEY).toString();
      router.push("/payment?courseId="+encodeURIComponent(ciphertext)+"&price="+price);
  }
   


  return (
    <>
      <div className={styles.overViewContainer}>
       {/* <span> <button onClick={()=>Setflag((prev)=>!prev)}>courses</button></span> */}

        <div className={styles.infoSection}>
           {/* learn */}
          <div className={styles.learn}>
            <p>What you`ll learn</p>
            <ul>
              {
                selectedCourse?.objectives.map((e, i)=>(
                   <li key={i}> <TiTick id={styles.Tick} />{e}</li>
                ))
              }
            </ul>
          </div>
          {/* Descriptions */}
          <div className={styles.descriptions}>
            <p>Course Descriptions</p>
            <span>{selectedCourse?.description}</span>
          </div>
          {/* requirements */}
          <div className={styles.requirements}>
            <p>Requirements</p>
            <ul>
              {
                selectedCourse?.requirements.map((e, index)=>(
                  <li key={index}> <FaArrowRight id={styles.Arrow}/>{e} </li>
                ))
              }
            </ul>
          </div>
        </div>

        <div className={styles.buySection}>
          <figure>
            <img src={selectedCourse?.thumbnail_url} alt="" />
          </figure>
          <div className={styles.priceBOX}>
          <span id={styles.discountPrice}><del>RS: {selectedCourse?.price? selectedCourse.price+1000 : 0}</del></span>
          <span id={styles.coursePrice}>RS: {selectedCourse?.price}</span>
          </div>
          <div className={styles.addToCart}>
            {/* add to card */}
            <button>Add to Cart</button>
          </div>
          <div className={styles.buyButton}>
            {/* buy section */}
            <button onClick={()=>goToPayment(selectedCourse?.course_id, selectedCourse?.price)}>Buy</button>
          </div>
          <div className={styles.promiess}>
            <ul>
              <li> <SiTicktick id={styles.Tick}/>  Full time access</li>
            </ul>
          </div>
          <hr id={styles.Line}/>

          <div className={styles.courseINFO}>
            <h4>This Course include:</h4>
            <ul>
              <li>On demand-video</li>
              <li>Rich in knowledge and content</li>
            </ul>
          </div>
        </div>
          <span className={styles.backToCcurseSPAN} onClick={()=>Setflag((prev)=>!prev)}>BACK</span>
    </div>
    </>
  );
};

export default OverViewInfo;

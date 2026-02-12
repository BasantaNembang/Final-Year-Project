"use client";

export const dynamic = "force-dynamic";

import React, { useEffect, useState } from "react";
import styles from "../../styles/paymentPage.module.css";
import CountryInputField from "@/helper/CountryInputField";
import { useForm } from "react-hook-form";
import { CountryNameDTO, PaymentDTO } from "@/types/enrollmentData";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useHelperContexHook } from "@/context/helperContext";
import { getUserID } from "@/lib/Helper-Service";
import { CiLock } from "react-icons/ci";
import { RiInboxLine } from "react-icons/ri";
import { CiClock2 } from "react-icons/ci";
import { PiCertificate } from "react-icons/pi";
import { TiTick } from "react-icons/ti";
import { getCourseById } from "@/lib/Helper-Two";
import { ResponseCourseDTO } from "@/types/courseData";

const PaymentPage = () => {
  const [CourseId, setCourseId] = useState<string | null>(null);
  const [courseDTO, setCourseDto] = useState<ResponseCourseDTO | null>(null);
  //const [price, setPrice] = useState<string | null>(null);
  const { setIsPrivate } = useHelperContexHook();

  //var CryptoJS = require("crypto-js");


  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setCourseId(searchParams.get("courseId"));
    //setPrice(searchParams.get("price"));
  }, []);




  const[user_id, SetUser_id] = useState<string | null>(null);

  //const secretKEY = process.env.NEXT_PUBLIC_MY_SECRECT_KEY;

  const router = useRouter();

  
  const form = useForm<PaymentDTO>();

  const {register, handleSubmit, formState} = form;
  const {errors} = formState;


  const [paymentForm, SetpaymentForm] = useState<PaymentDTO>({
    courseId: '',
    userId: '', 
    price: 0,
    paymentMethod: "VISA_CARD",
    countryName: undefined,
    cardNumber: '',
    monthYear: '',
    cvNumber: '',
    accountName: ''
  })

  //for countyName
  const [countryName, SetCountyName] = useState<CountryNameDTO>();


  const getCourseInfo = async() =>{
    if(!CourseId) return;
    //var bytes  = CryptoJS.AES.decrypt(CourseId, secretKEY);
    //var courseID = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    const response = await getCourseById(CourseId);
    setCourseDto(response)
  }

  useEffect(()=>{
    setIsPrivate(true)
  }, []);

  useEffect(()=>{
   if(CourseId) getCourseInfo()
  }, [CourseId]);
   

  const getUserId = async() =>{
    try{
      const id = await getUserID()
      SetUser_id(id)
    }catch(error){
      console.error(error)
    }
  }


  useEffect(()=>{
    getUserId()
  }, []);
 

  const handelInputField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) =>{
   const {name, value} = e.target;
   SetpaymentForm({...paymentForm, [name]:value})
  }


  const paymentForCourse = async() => {
    if(CourseId!==null){
    //var bytes  = CryptoJS.AES.decrypt(CourseId, secretKEY);
    //var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    paymentForm.userId=user_id!
    paymentForm.courseId=CourseId;
    //paymentForm.price=Number(price);
    paymentForm.countryName=countryName?.countryName

    //call the backend-API (Enrollment-Service)
    try{
    const response = await axios.post('/api/backend/enroll', paymentForm)
    if(response?.data.msg === "ENROLL-SUCCESS"){     

      toast.success("Course purchase sucessfully")
      //remove all the fields
      SetpaymentForm({
          courseId: '',
          userId: '', 
          price: 0,
          paymentMethod: "VISA_CARD",
          countryName: undefined,
          cardNumber: '',
          monthYear: '',
          cvNumber: '',
          accountName: '' 
      })
      //go to course section
      router.push('/course')
    }else{
      toast.info(response?.data.msg);
    }
    }catch(error){
      console.error(error)
    }
    }
  };


  const back = () =>{
    router.push("/course")
  }



  if(!courseDTO) return;


  return (
    <>
      <div className={styles.paymentContainer}>

        <form action="#" onSubmit={handleSubmit(paymentForCourse)}>
        <div className={styles.cardSection}>
          <h2>Check Out</h2>
          <div className={styles.billingSection}>
            <span>Billing address</span>
            <CountryInputField  SetCountyName={SetCountyName}/>
          </div>
          <div className={styles.cardBOX}>
            <div className={styles.paymentInfo}>
              <div className={styles.left_paymentInfo}>
                <div style={{fontSize:'1.2rem', fontWeight:'bold'}}>Payment Method</div>
                <div className={styles.card_ImageSection}>Credit / Debit Card <figure> <img src="./visaCard.jpg" alt="" /> <img src="./mastercard.png" alt="" /> </figure>  </div> 
              </div>
             <div className={styles.rigth_paymentInfo}>
               <p> <CiLock style={{fontSize:'1.3rem', color:'#888585'}}/></p> <p>Secured connection</p>
             </div>
            </div>
            <select id="paymentMethod" 
              {...register("paymentMethod", {required: {value:true, message:"Select Payment Method"}
              })}
            onChange={handelInputField}
            >
              <option value="">-- Select a payment Method --</option>
              <option value="VISA_CARD">VISA_CARD</option>
              <option value="DOLLAR_CARD">DOLLAR-CARD</option>
              <option value="MASTER_CARD">MASTER_CARD</option>
              <option value="PAY_PAY">PAY_PAY</option>
            </select>
            {
              errors.paymentMethod && (
                <span className={styles.errorContainer}>{errors.paymentMethod.message}</span>
              )
             }
            <div className={styles.cardBoxInput}>
              <label htmlFor="cardNumber">Card Number</label> <br />
              <div className={styles.outer}>
                <input type="text"  id="cardNumber" placeholder="1234 5678 5566 9911" value={paymentForm.cardNumber}
                {...register("cardNumber", {required: {value:true, message:"Must enter your Card Number"},
                minLength: {value:16, message:"Must Enter all 16 digits"},
                maxLength: {value:17, message:"Number Exceed"},
                })}
                
                onChange={handelInputField} />
                <RiInboxLine id={styles.BOX}/>
              </div>
             {
              errors.cardNumber && (
                <span className={styles.errorContainer}>{errors.cardNumber.message}</span>
              )
             }
            </div>
            <div className={styles.cardMetaData}>
              <div>
                <label htmlFor="monthYear">Expiry Date</label>  <br />
                <input type="month" id="monthYear" name="monthYear" pattern="(0[1-9]|1[0-2])\/\d{4}"  placeholder="MM/YYYY" value={paymentForm.monthYear}
                onChange={handelInputField}/>
              </div>
              <div>
                <label htmlFor="cvc">CVC/CVV</label>   <br />
                <input type="number"  id="cvc" placeholder="CVC"
                {...register("cvNumber", {required: {value:true, message:"Must enter your CVC number"},
                minLength: {value:2, message:"Must Enter digits"},
                maxLength: {value:4, message:"Number Exceed"},
                })}
                onChange={handelInputField}/>
                {
                  errors.cvNumber && (
                    <span className={styles.errorContainer}>{errors.cvNumber.message}</span>
                  )
                }
              </div>
            </div>
            <div className={styles.cardBoxInput_name}>
              <label htmlFor="nameCard">Name on card</label>  <br />
              <input type="text" id="nameCard" placeholder="Name on card" 
                {...register("accountName", {required: {value:true, message:"Must enter account holder name"}
                })}
               onChange={handelInputField}/>
            {
              errors.accountName && (
                <span className={styles.errorContainer}>{errors.accountName.message}</span>
              )
             }              
            </div>            
          </div>


          <div className={styles.orderDetails}>
            <div className={styles.left_orderDetails}>
              <p>Order details</p>
              <figure>
                <img src={courseDTO?.thumbnail_url} alt="" />
              </figure>
            </div>
            <div className={styles.right_orderDetails}>
               <p>{courseDTO?.categoryResponseDTO.subcategory}</p>
               <p className={styles.txt_orderDetails}>By {courseDTO?.author}</p>
               <div className={styles.orderdetails_metaData}>
                 <div className={styles.txt_orderDetails}> <CiClock2 /> {courseDTO?.time} hrs </div>
                 <div className={styles.txt_orderDetails}> <PiCertificate /> Certificate</div>
               </div>
            </div>
           </div>
        </div>

        <button id={styles.backBTN} onClick={back}>Back</button>
        <div className={styles.paySection}>
          <h3>Summary</h3>
          <div className={styles.priceInfo}>
            <div className={styles.priceInfo_original}>
              <span>Original Price</span>
              <span>Rs {courseDTO.price + 1000}</span>
            </div>
            <div className={styles.priceInfo_discount}>
              <span>Discount Percentage</span>
              <span>10%</span>
            </div>
          </div>
          <hr />
          <div className={styles.totalPrice}>
            <span>Total:</span>
            <span style={{fontWeight:'bold'}}>Rs {courseDTO.price}</span>
          </div>

          <div className={styles.btnSection}>
            <button type="submit">Complete CheckOut</button>   
            <span>30-Day Money-Back Guarantee</span>  
          </div>

          <div className={styles.outComes}>
            <ul>
              <li><TiTick id={styles.tick}/>  Lifetime access to course content</li>
              <li><TiTick id={styles.tick}/>  Certificate of completion</li>
              <li><TiTick id={styles.tick}/>  Access on mobile and desktop</li>
              <li><TiTick id={styles.tick}/>  Downloadable resources</li>
            </ul>
          </div>

        </div>
      </form>    
      </div>
    </>
  );
};

export default PaymentPage;


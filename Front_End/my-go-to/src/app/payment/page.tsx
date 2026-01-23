"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/paymentPage.module.css";
import { useSearchParams } from "next/navigation";
import CountryInputField from "@/helper/CountryInputField";
import { useForm } from "react-hook-form";
import { CountryNameDTO, PaymentDTO } from "@/types/enrollmentData";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';
import axios from "axios";
import { useHelperContexHook } from "@/context/helperContext";

const PaymentPage = () => {

  const { setIsPrivate } = useHelperContexHook();

  var CryptoJS = require("crypto-js");

  const searchParams = useSearchParams();
  const CourseId = searchParams.get("courseId");
  const price = searchParams.get("price");

  const[user_id, SetUser_id] = useState<string | null>(null);

  const secretKEY = process.env.NEXT_PUBLIC_MY_SECRECT_KEY;

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

  useEffect(()=>{
      setIsPrivate(true)
  }, []);
  
 

  const getUserID = async() =>{
    try{
      let respones = await axios.get('/api/auth/getId');
      SetUser_id(respones?.data?.userId)
    }catch(error){
      console.error(error)
    }
  }


  useEffect(()=>{
    getUserID()
  }, []);
 

  const handelInputField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> ) =>{
   const {name, value} = e.target;
   SetpaymentForm({...paymentForm, [name]:value})
  }


  const paymentForCourse = async() => {
    if(CourseId!==null){
    var bytes  = CryptoJS.AES.decrypt(CourseId, secretKEY);
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    paymentForm.userId=user_id!
    paymentForm.courseId=decryptedData;
    paymentForm.price=Number(price);
    paymentForm.countryName=countryName?.countryName

    //call the backend-API (Enrollment-Service)
    try{
    let response = await axios.post('/api/backend/enroll', paymentForm)
    console.log('response')
    console.log(response)
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


  


  return (
    <>
      <div className={styles.paymentContainer}>

        <form action="#" onSubmit={handleSubmit(paymentForCourse)}>
        <div className={styles.cardSection}>
          <span>Check Out</span>
          <span>Billing address</span>
          <CountryInputField  SetCountyName={SetCountyName}/>
          <div className={styles.cardBOX}>
            <label htmlFor="payment">Payment</label>
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
              <input type="text"  id="cardNumber" placeholder="1234 5678 5566 9911" value={paymentForm.cardNumber}
              {...register("cardNumber", {required: {value:true, message:"Must enter your Card Number"},
              minLength: {value:16, message:"Must Enter all 16 digits"},
              maxLength: {value:17, message:"Number Exceed"},
              })}
              onChange={handelInputField} />
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
            <div className={styles.cardBoxInput}>
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
        </div>

        <div className={styles.paySection}>
          pay section
          <button type="submit" >Pay</button>     
        </div>
      </form>    
      </div>
    </>
  );
};

export default PaymentPage;


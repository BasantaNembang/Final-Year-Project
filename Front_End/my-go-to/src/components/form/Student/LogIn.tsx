"use client";

import React, { useState } from "react";
import styles from "../../../styles/authPage.module.css";
import { useForm } from "react-hook-form";
import { LoginDetails } from "@/types/usersData";
import { loginStudentBackend } from "@/api/Auth-Service";

interface logInProps{
  SetAuthFlag: React.Dispatch<React.SetStateAction<Boolean>>
}

const LogIn = ({SetAuthFlag}: logInProps) => {

  const form = useForm();
  
  const {register, handleSubmit} = form;

  const [loginStdForm, SetLoginStdForm] = useState<LoginDetails>({
    email:'',
    password:''
  })

  const tarckFiled = (e: React.ChangeEvent<HTMLInputElement>) =>{
    let {name, value} = e.target;
    SetLoginStdForm({...loginStdForm, [name]: value});
  }  


  const logInStudent = async() =>{
   let response = await loginStudentBackend(loginStdForm);    
  }

  const goToSignUp = () =>{
   SetAuthFlag((prev)=>!prev);
  }


  return (
    <>
      <div className={styles.stdLoginConatiner}>
        <div>Welcome Log IN</div>
        <form action="#" method="post" onSubmit={handleSubmit(logInStudent)}>
          <div>
            <label htmlFor="">Email</label>
            <input type="email"  id="" 
            {...register("email", {required:{value:true, message:"Enter your Email"}})}
            onChange={tarckFiled} />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="password" id="" />
          </div>
          <button type="submit">Create</button>
        </form>     
        <div>
          <span style={{color:"blue"}} onClick={goToSignUp}>Sign-Up</span>
        </div>           
      </div>
    </>
  );
};

export default LogIn;

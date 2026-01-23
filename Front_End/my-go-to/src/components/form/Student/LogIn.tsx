"use client";

import React, { useState } from "react";
import styles from "../../../styles/authPage.module.css";
import { useForm } from "react-hook-form";
import { LoginDetails } from "@/types/usersData";
import { loginUSER } from "@/lib/Auth-Backend";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";


interface logInProps{
  SetAuthFlag: React.Dispatch<React.SetStateAction<Boolean>>
}

const LogIn = ({SetAuthFlag}: logInProps) => {

  const form = useForm();
  const router =  useRouter();
  
  const {register, handleSubmit} = form;

  const [loginStdForm, SetLoginStdForm] = useState<LoginDetails>({
    email:'',
    password:''
  })

  const trackField = (e: React.ChangeEvent<HTMLInputElement>) =>{
    let {name, value} = e.target;
    SetLoginStdForm({...loginStdForm, [name]: value});
  }  



  const logInStudent = async() =>{
    const response = await loginUSER(loginStdForm)
    if(response){
      toast.success("login successfully")
      router.push("/learnings")
    }else{
     toast.error("Invalid username and password")
    }
    
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
            onChange={trackField} />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="password" id="" 
            {...register("password", { required:{value:true, message:"Enter your Password"}})}
            onChange={trackField}  />
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

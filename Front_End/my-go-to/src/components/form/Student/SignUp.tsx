"use client";

import React, { useState } from "react";
import styles from "../../../styles/authPage.module.css";
import { StudentDetails } from "@/types/usersData";
import { useForm } from "react-hook-form";
import axios from "axios";


interface signUpProps{
  SetAuthFlag: React.Dispatch<React.SetStateAction<Boolean>>
}

const SignUp = ({SetAuthFlag} : signUpProps) => {

 // const { saveToken } = useAuthContexHook();

  const form = useForm();
  
  const {register, handleSubmit} = form;

  const [stdForm, SetstdForm] = useState<StudentDetails>({
    email:'',
    username:'',
    password:'',
    role:''
  })


  const tarckFiled = (e: React.ChangeEvent<HTMLInputElement>) =>{
    if(stdForm.role === ''){
      stdForm.role = 'STUDENT'
    }
    let {name, value} = e.target;
    SetstdForm({...stdForm, [name]: value});
  }




  const signUpStudent = async() =>{
     let form = new FormData();
     form.append("userDto", new Blob([JSON.stringify(stdForm)]))
     try{
      let response = await axios.post('/api/auth/signup', form)
      console.log("success")
      console.log(response)
     }catch(error){
      console.error(error)
     }
   
  }

  
  const goToLogin = () =>{
    SetAuthFlag((prev)=>!prev)
  }


  return (
    <>
      <div className={styles.stdSignUpConatiner}>
        <div>Welcome SIGN-UP</div>
        <form action="#" method="post" onSubmit={handleSubmit(signUpStudent)}>
          <div>
            <label htmlFor="">Name</label>
            <input type="text"  id="" 
            {...register("username", {required:{value:true, message:"Enter your Name"}})}
            onChange={tarckFiled}
            />
          </div>
          <div>
            <label htmlFor="">Email</label>
            <input type="email"  id="" 
             {...register("email", {required:{value:true, message:"Enter your Name"}})}
            onChange={tarckFiled}           
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input type="password" id="" 
            {...register("password", {required:{value:true, message:"Enter your Password"}})}
            onChange={tarckFiled}            
            />
          </div>
          <button type="submit">Create</button>
        </form>
        <div>
          <span style={{color:"blue"}} onClick={goToLogin}>LogIn</span>
        </div>
      </div>
    </>
  );
};

export default SignUp;

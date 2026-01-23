import React, { useState } from "react";
import styles from "../../../styles/teacherAuthModel.module.css";
import { LoginDetails } from "@/types/usersData";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from 'next/navigation';

interface logInProps{
  SetFlag: React.Dispatch<React.SetStateAction<Boolean>>
  SetAuthFlag: React.Dispatch<React.SetStateAction<Boolean>>
}

const LogIn = ({SetFlag, SetAuthFlag}: logInProps) => {
  const form = useForm();

  const { register, handleSubmit } = form;

  const router = useRouter();

  const [loginForm, SetLoginForm] = useState<LoginDetails>({
    email: "",
    password: "",
  });


  const tarckFiled =(e: React.ChangeEvent<HTMLInputElement>)=>{
    let {value, name} = e.target;
    SetLoginForm({...loginForm, [name]:value})
  }

  
  const loginTeacher = async() => {
    try{
    let response = await axios.post('/api/auth/login', loginForm)
    console.log("successfully")
    console.log(response)
    router.push("/upload")
    }catch(error){
      console.error(error)
    }
  };

  const showSinUPTeaher = () =>{
   SetAuthFlag((prev)=>!prev)
  }


  return (
    <>
      <div className={styles.logInContainer}>
        <span onClick={()=>SetFlag(false)} style={{cursor:"pointer"}}>X</span>
        <div>heading content</div>
        <form action="#" method="post" onSubmit={handleSubmit(loginTeacher)}>
          <div>
            <label htmlFor="">Email</label>
            <input type="email"  id="" 
            {...register("email", {required:{value:true, message:"Enter Email"}})}
            onChange={tarckFiled}
            />
          </div>

          <div>
            <label htmlFor="">Password</label>
            <input type="password"  id="" 
            {...register("password", {required:{value:true, message:"Enter Password"}})}
            onChange={tarckFiled}            
            />
          </div>

          <button type="submit">LogIn</button>
        </form>
         <div>
         Don`t have account create one
          <span style={{ color: "blue" }} onClick={showSinUPTeaher}>sing up</span>
          </div>
      </div>
    </>
  );
};

export default LogIn;

import React, { useState } from "react";
import styles from "../../../styles/teacherAuthModel.module.css";
import { LoginDetails } from "@/types/usersData";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from 'next/navigation';
import { LuUserPlus } from "react-icons/lu";

interface logInProps {
  SetFlag: React.Dispatch<React.SetStateAction<Boolean>>
  SetAuthFlag: React.Dispatch<React.SetStateAction<Boolean>>
}

const LogIn = ({ SetFlag, SetAuthFlag }: logInProps) => {
  const form = useForm<LoginDetails>();

  const { register, handleSubmit, formState } = form;
  
  const { errors } = formState;

  const router = useRouter();

  const [loginForm, SetLoginForm] = useState<LoginDetails>({
    email: "",
    password: "",
  });


  const tarckFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    SetLoginForm({ ...loginForm, [name]: value })
  }


  const loginTeacher = async () => {
    try {
      await axios.post('/api/auth/login', loginForm)
      router.push("/upload")
    } catch (error) {
      console.error(error)
    }
  };

  const showSinUPTeaher = () => {
    SetAuthFlag((prev) => !prev)
  }


  return (
    <>
      <div className={styles.logInContainer}>
        {/* <span onClick={()=>SetFlag(false)} style={{cursor:"pointer"}}>X</span>
        <div>heading content</div> */}
        <span onClick={() => SetFlag(false)} id={styles.back}>X</span>
        <div className={styles.headingSection}  >
          <div className={styles.iconSection}  >
            <span>
              <LuUserPlus />
            </span>
          </div>
          <h3>Welcome!</h3>
          <p>Sign in to your teacher account</p>
        </div>

        <form action="#" method="post" onSubmit={handleSubmit(loginTeacher)}>
          <div className={styles.fristRow}>
            <div>
              <label htmlFor="">Email</label> <br />
              <input type="email" id=""
                {...register("email", { required: { value: true, message: "Enter Email" } })}
                onChange={tarckFiled}
              />
              {
               errors.email && (
                <span className={styles.errorContainer}>
                  {errors.email.message}
                </span>                
               )              
              }            
            </div>
          </div>

          <div className={styles.fristRow}>
            <div>
              <label htmlFor="">Password</label> <br />
              <input type="password" id=""
                {...register("password", { required: { value: true, message: "Enter Password" } })}
                onChange={tarckFiled}
              />
              {
               errors.password && (
                <span className={styles.errorContainer}>
                  {errors.password?.message}
                </span>                
               )              
              }
            </div>
          </div>

          <button type="submit">LogIn</button>
        </form>

        <div style={{display:"flex", justifyContent:"center"}}>
          Don`t have account create one
          <span style={{ color: "blue", marginLeft:'1rem', cursor:"pointer" }} onClick={showSinUPTeaher}>Create one</span>
        </div>
      </div>
    </>
  );
};

export default LogIn;

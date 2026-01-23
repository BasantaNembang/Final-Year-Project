"use client";

import React, { useState } from "react";
import { TeacherDetails } from "@/types/usersData";
import { useForm } from "react-hook-form";
import styles from "../../../styles/teacherAuthModel.module.css";
import axios from "axios";
import { useRouter } from 'next/navigation';

interface singUpProps{
  SetFlag: React.Dispatch<React.SetStateAction<Boolean>>
  SetAuthFlag: React.Dispatch<React.SetStateAction<Boolean>>
}



const SignUp = ({SetFlag, SetAuthFlag } : singUpProps) => {


  const form = useForm<TeacherDetails>();

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const router = useRouter();

  const [teacherData, SetTeacherData] = useState<TeacherDetails>({
    email: "",
    role: "",
    password: "",
    username: "",
    job: "",
    phoneNumber: "",
    address: "",
    background: "",
  });

  const [imageFile, SetImageFile] = useState<File | null>(null);
  const [customError, SetcustomError] = useState<string | null>(null);

  const trackFiled = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value } = e.target;
    SetTeacherData({ ...teacherData, [name]: value });
  };

  const trackImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      SetImageFile(e.target.files[0]);
    }
  };


  const createAccount = async () => {
    const formdata = new FormData();

    if (teacherData.password !== teacherData.conformPassword) {
      SetcustomError("Password didn’t match");
      return;
    }

    if (imageFile) {
      formdata.append("image", imageFile);
    }

    const payload = {
      ...teacherData,
      role: "TEACHER",
    };

    delete payload.conformPassword;

    formdata.append("userDto",new Blob([JSON.stringify(payload)], { type: "application/json" }));

    try {
      const response = await axios.post("/api/auth/signup", formdata);
      console.log("successfully");
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  
  const showLogInTeaher = () =>{
    SetAuthFlag((prev)=>!prev);
  }



  return (
    <>
      <div className={styles.signupSection}>
        <span onClick={()=>SetFlag(false)} style={{cursor:"pointer"}}>X</span>
        <div>heading content</div>
        <form action="#" method="post" onSubmit={handleSubmit(createAccount)}>
          <div className={styles.userInfo}>
            <div>
              <label htmlFor="">Full Name</label>
              <input
                type="text"
                id=""
                placeholder="Enter Full Name"
                {...register("username", {
                  required: { value: true, message: "Enter your Full Name" },
                })}
                onChange={trackFiled}
              />
              {errors.username && (
                <span className={styles.errorContainer}>
                  {errors.username.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="">Job</label>
              <input
                type="text"
                id=""
                placeholder="Enter your job role"
                {...register("job", {
                  required: { value: true, message: "Enter your Job role" },
                })}
                onChange={trackFiled}
              />
              {errors.job && (
                <span className={styles.errorContainer}>
                  {errors.job.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="">Phone Number</label>
              <input
                type="number"
                id=""
                placeholder="Enter your phone number"
                {...register("phoneNumber", {
                  required: { value: true, message: "Enter your phone number" },
                  minLength: { value: 10, message: "Enter atleast 10 digits" },
                  maxLength: { value: 11, message: "Number excced" },
                })}
                onChange={trackFiled}
              />
              {errors.phoneNumber && (
                <span className={styles.errorContainer}>
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="">Email</label>
              <input
                type="email"
                id=""
                placeholder="Enter your email"
                {...register("email", {
                  required: { value: true, message: "Enter your email" },
                })}
                onChange={trackFiled}
              />
            </div>
          </div>

          <div className={styles.metaInfo}>
            <div>
              <label htmlFor="">Address</label>
              <input
                type="text"
                id=""
                placeholder="Enter your address"
                {...register("address", {
                  required: { value: true, message: "Enter your address" },
                })}
                onChange={trackFiled}
              />
            </div>
            <div>
              <label htmlFor="">Short Background</label>
              <textarea
                id=""
                placeholder="Tell us about your past experience"
                {...register("background", {
                  required: {
                    value: true,
                    message: "Tell us about your background story",
                  },
                })}
                onChange={trackFiled}
              />
            </div>
            <div>
              <input type="file" name="" id="" onChange={trackImage} required />
            </div>
            <div>
              <label htmlFor="">Create Password</label>
              <input
                type="password"
                id=""
                placeholder="Create password"
                {...register("password", {
                  required: { value: true, message: "Enter password" },
                })}
                onChange={trackFiled}
              />
              {<span>{errors.password?.message}</span>}
            </div>
            <div>
              <label htmlFor="">Confirm Password</label>
              <input
                type="password"
                id=""
                placeholder="Create password"
                {...register("conformPassword", {
                  required: { value: true, message: "Enter password" },
                })}
                onChange={trackFiled}
              />
              {errors.conformPassword && (
                <span className={styles.errorContainer}>
                  {errors.conformPassword.message}
                </span>
              )}
             {customError!==null ? (<span>{customError}</span>) : null }
             

            </div>
            <button type="submit">Create Account</button>
            <div>
              ALready have an accounnt{" "}
              <span style={{ color: "blue" }} onClick={showLogInTeaher}>sing in</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;

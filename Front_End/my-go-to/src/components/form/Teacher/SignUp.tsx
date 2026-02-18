"use client";

import React, { useState } from "react";
import { TeacherDetails } from "@/types/usersData";
import { useForm } from "react-hook-form";
import styles from "../../../styles/teacherAuthModel.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { LuUserPlus } from "react-icons/lu";
import { useRouter } from "next/navigation";

interface singUpProps {
  SetFlag: React.Dispatch<React.SetStateAction<Boolean>>
  SetAuthFlag: React.Dispatch<React.SetStateAction<Boolean>>
}


const SignUp = ({ SetFlag, SetAuthFlag }: singUpProps) => {


  const form = useForm<TeacherDetails>();

  const router = useRouter();

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;


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

  const [imageSelected, setImageSelected] = useState(false);

  const trackFiled = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    SetTeacherData({ ...teacherData, [name]: value });
  };

  const trackImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      SetImageFile(e.target.files[0]);
      setImageSelected(true);
    }
    else {
      setImageSelected(false);
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

    formdata.append("userDto", new Blob([JSON.stringify(payload)], { type: "application/json" }));


    try {
       await axios.post("/api/auth/signup", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      //remove the data
      SetTeacherData({
            email: "",
            role: "",
            password: "",
            username: "",
            job: "",
            phoneNumber: "",
            address: "",
            background: "",
      })
      toast.success("login successfully")
      router.push("/")
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };


  const showLogInTeaher = () => {
    SetAuthFlag((prev) => !prev);
  }



  return (
    <>
      <div className={styles.signupSection}  >
        <span onClick={()=>SetFlag(false)} id={styles.back}>X</span>
        <div className={styles.headingSection}  >
          <div className={styles.iconSection}  >
            <span>
              <LuUserPlus />
            </span>
          </div>
          <h3>Create account!</h3>
          <p>Join our teaching community</p>
        </div>
        <form action="#" method="post" onSubmit={handleSubmit(createAccount)}>
          <div className={styles.fristRow}>
            <div>
              <label htmlFor="">Full Name</label>  <br />
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
              <label htmlFor="">Job</label> <br />
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
          </div>

          <div className={styles.secondRow}>
            <div>
              <label htmlFor="">Phone Number</label> <br />
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
              <label htmlFor="">Email</label> <br />
              <input
                type="email"
                id=""
                placeholder="Enter your email"
                {...register("email", {
                  required: { value: true, message: "Enter your email" },
                })}
                onChange={trackFiled}
              />
              {errors.phoneNumber && (
                <span className={styles.errorContainer}>
                  {errors.email?.message}
                </span>
              )}

            </div>
          </div>

          {/* second form */}
          <div className={styles.metaInfo}>

            <div className={styles.metaInfoAddress}>
              <label htmlFor="">Address</label> <br />
              <input
                type="text"
                id=""
                placeholder="Enter your address"
                {...register("address", {
                  required: { value: true, message: "Enter your address" },
                })}
                onChange={trackFiled}
              />
              {errors.phoneNumber && (
                <span className={styles.errorContainer}>
                  {errors.address?.message}
                </span>
              )}              
            </div>


            <div className={styles.metaInfoAddress}>
              <label htmlFor="">Short Background</label> <br />
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
                {errors.phoneNumber && (
                  <span className={styles.errorContainer}>
                    {errors.background?.message}
                  </span>
                )}
            </div>


            <div className={styles.imageUpload}>
              <label htmlFor="fileUpload" className={styles.customFile}
                style={{
                  backgroundColor: imageSelected ? "#4caf50" : "#f4f4f4",
                  color: imageSelected ? "white" : "black",
                  transition: "0.3s"
                }}>
                {imageSelected ? "Image Selected ✓" : "Upload Image"}
              </label>
              <input
                type="file"
                id="fileUpload"
                onChange={trackImage}
              />
            </div>


            <div className={styles.passwordRow}>
              <div>
                <label htmlFor="">Create Password</label> <br />
                <input
                  type="password"
                  id=""
                  placeholder="Create password"
                  {...register("password", {
                    required: { value: true, message: "Enter password" },
                  })}
                  onChange={trackFiled}
                />
                {errors.password && (
                  <span className={styles.errorContainer}>
                    {errors.password?.message}
                  </span>
                )}              </div>
              <div>
                <label htmlFor="">Confirm Password</label> <br />
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
                {customError !== null ? (<span>{customError}</span>) : null}
              </div>

            </div>
            <div className={styles.singnupBTN}>
              <button type="submit">Create Account</button>
            </div>
            <div className={styles.lastSection}>
              Already have an accounnt
              <span style={{ color: "blue",marginLeft:"1rem", cursor:"pointer" }} onClick={showLogInTeaher}>SIGN IN</span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;

"use client";

import React, { useState } from "react";
import styles from "../../../styles/authPage.module.css";
import { StudentDetails } from "@/types/usersData";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";


interface signUpProps {
  SetAuthFlag: React.Dispatch<React.SetStateAction<Boolean>>
}

const SignUp = ({ SetAuthFlag }: signUpProps) => {

  const form = useForm<StudentDetails>();
  const router = useRouter();

  const { register, handleSubmit, formState } = form;

  const { errors } = formState;

  const [stdForm, SetstdForm] = useState<StudentDetails>({
    email: '',
    username: '',
    password: '',
    role: ''
  })


  const tarckFiled = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (stdForm.role === '') {
      stdForm.role = 'STUDENT'
    }
    let { name, value } = e.target;
    SetstdForm({ ...stdForm, [name]: value });
  }




  const signUpStudent = async () => {
    const form = new FormData();
    form.append("userDto", new Blob([JSON.stringify(stdForm)], { type: "application/json" }))
    try {
      await axios.post('/api/auth/signup', form, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      toast.success("login successfully")
      router.push("/course")
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  }


  const goToLogin = () => {
    SetAuthFlag((prev) => !prev)
  }


  return (
    <>
      <div className={styles.stdSignUpConatiner}>
        <div className={styles.headingSection}  >
          <div className={styles.iconSection}  >
            <span>
              <MdAccountCircle />
            </span>
          </div>
          <h3>Create account!</h3>
        </div>
        <form action="#" method="post" onSubmit={handleSubmit(signUpStudent)}>
          <div>
            <label htmlFor="">Name :</label> <br />
            <input type="text" id=""
              {...register("username", { required: { value: true, message: "Enter your Name" } })}
              onChange={tarckFiled}
            />
            {
              errors.username && (
                <span className={styles.errorContainer}>
                  {errors.username?.message}
                </span>
              )
            }
          </div>
          <div>
            <label htmlFor="">Email :</label> <br />
            <input type="email" id=""
              {...register("email", { required: { value: true, message: "Enter your Email" } })}
              onChange={tarckFiled}
            />
            {
              errors.email && (
                <span className={styles.errorContainer}>
                  {errors.email?.message}
                </span>
              )
            }

          </div>
          <div>
            <label htmlFor="">Password :</label>
            <input type="password" id=""
              {...register("password", { required: { value: true, message: "Enter your Password" } })}
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
          <button type="submit">Create</button>
        </form>
        <div className={styles.gotoLogin}>
          or  <span onClick={goToLogin}>LogIn</span>
        </div>
      </div>
    </>
  );
};

export default SignUp;



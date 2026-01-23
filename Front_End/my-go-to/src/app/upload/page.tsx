"use client";

import React, {  useState, useEffect, useRef } from "react";
import styles from "../../styles/uploadPage.module.css";
import AddCourse from "@/components/addCourse/AddCourse";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { SlSettings } from "react-icons/sl";
import ManageCourse from "@/components/manageCourse/ManageCourse";
import { GrStorage } from "react-icons/gr";
import DraftCourse from "@/components/draftCourse/DraftCourse";
import Message from "@/components/teacherMessage/Message";
import { FiMessageSquare } from "react-icons/fi";
import { getUserID } from "@/lib/Helper-Service";


const UploadPage = () => {
  
  const [flagDashboardDraftCourse, setflagDashboardDraftCourse] =   useState<boolean>(true);
  const [flagDashboardCourse, setflagDashboardCourse] =  useState<boolean>(false);
  const [flagDashboardCourseManage, setflagDashboardCourseManage] =  useState<boolean>(false);
  const [flagMessages, setflagMessages] =  useState<boolean>(false);
  const hasRun = useRef(false);

  const [teacherId, setTeacherId] = useState<string | null>(null);

     
  const getTeacherID = async() =>{
    const id = await getUserID();
    setTeacherId(id);
  }


 useEffect(()=>{
  if (hasRun.current) return; // exit if already run
     hasRun.current = true;      // mark as run
      getTeacherID();
  }, []);


  const openDashBoard = (text: String) => {    

    if (text === "course") {
      setflagDashboardCourse(true);
      setflagDashboardCourseManage(false);
      setflagDashboardDraftCourse(false);
      setflagMessages(false);
    } else if (text === "manage_course") {
      setflagDashboardCourseManage(true);
      setflagDashboardCourse(false);
      setflagDashboardDraftCourse(false);
      setflagMessages(false);     
    }
    else if(text === "draft_course"){
      setflagDashboardDraftCourse(true);
      setflagDashboardCourse(false);
      setflagDashboardCourseManage(false);
      setflagMessages(false);
    }
    else if(text === "message"){
      setflagMessages(true);
      setflagDashboardDraftCourse(false);
      setflagDashboardCourse(false);
      setflagDashboardCourseManage(false);
    }
  };

 if(!teacherId) return;

  return (
    <>
      <div className={styles.uploadContainer}>
        <div className={styles.infoUploadContainer}>
          <h3>Teach on MyGoTo</h3>
          <p>Share your knowledge and earn money by creating courses</p>
          <div className={styles.educationINFOS}>
            <div className={styles.educationINFO}>
              <span style={{color:"blue"}}>10K+</span>
              <p>Active Students</p>
            </div>
            <div className={styles.educationINFO}>
              <span style={{color:"green"}}>$1M+</span>
              <p>Paid to Instructors</p>
            </div>
            <div className={styles.educationINFO}>
              <span style={{color:"purple"}}>70+</span>
              <p>Courses Created</p>
            </div>
          </div>
        </div>
        <div className={styles.uploadContentContiner}>
          <div className={styles.topUpLoadContentContainer}>
            <ul>
              <li> <GrStorage /> <button onClick={()=>openDashBoard("draft_course")} style={{color: flagDashboardDraftCourse ? 'green' : 'black'}}>  Draft Course</button>  { flagDashboardDraftCourse && (<span></span>) }</li>
              <li > <AiOutlinePlusCircle /> <button onClick={()=>openDashBoard("course")} style={{color: flagDashboardCourse ? 'green' : 'black'}}> Create Course</button> { flagDashboardCourse && (<span></span>) } </li>
              <li style={{width:"13rem"}}> <SlSettings /> <button onClick={()=>openDashBoard("manage_course")} >Manage Courses</button> { flagDashboardCourseManage && (<span></span> ) }</li>
              <li > <FiMessageSquare /> <button onClick={()=>openDashBoard("message")} style={{color: flagMessages ? 'green' : 'black'}}> Messages </button> { flagMessages && (<span></span>) } </li>
            </ul>
          </div>
          <hr style={{color:"#b2b0b0"}}/>
          <div className={styles.downpUpLoadContentContainer}>
            {
              flagDashboardDraftCourse && (  <DraftCourse />   )
            }
            {
              flagDashboardCourse && ( <div className={styles.pageWrapper}>  <AddCourse /> </div>  )
            }
            {
              flagDashboardCourseManage && ( <ManageCourse /> )
            }
            {
              flagMessages && ( <Message teacherId={teacherId!} /> )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;

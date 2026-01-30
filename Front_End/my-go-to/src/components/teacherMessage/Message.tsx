"use client";

import React, { useEffect, useState, useRef } from "react";
import styles from "../../styles/teacherMessage.module.css";
import ListStudent from "./ListStudent";
import Chat from "./Chat";
import { dmMessages, DmSubMessages, TeacherDmMSG } from "@/types/chatData";
import { getAllDmMessagesTeacher } from "@/lib/Chat-Service";

interface messageProps{
  teacherId: string,
}


const Message = ({ teacherId }: messageProps) => {
  
  const [chatData, setChatData] = useState<dmMessages | null>(null);
  const [teacherMsg, setTeacherMsg] = useState<TeacherDmMSG[] | null>(null);
  const [listOfSTD, setListOfSTD] = useState<dmMessages[] | []>([]);
  const [dmContent, setDmContent] = useState<DmSubMessages[] | null>(null);

  const hasRun = useRef(false);

  
  const getAllTeacherMsg = async() =>{  
    if(!teacherId) return;
    const response = await getAllDmMessagesTeacher(teacherId);
    setTeacherMsg(response.data)
  }  

 
  useEffect(()=>{  //initial rendering.........
    if (hasRun.current) return; 
      hasRun.current = true;   
      getAllTeacherMsg();
   }, [teacherId]);

  
  useEffect(()=>{
    if(!dmContent) return;
    getAllTeacherMsg();
  }, [dmContent]);


  const defSetLISTData = () =>{
     if(!listOfSTD) return; 
     setListOfSTD([]);

     teacherMsg?.map((each, _)=>{
     setListOfSTD(prev=> [...prev, ...each.dmMessages])}
    )
  }


  useEffect(()=>{
    if(!teacherMsg) return;
     defSetLISTData();
  }, [teacherMsg]);


    
  return (
    <>
      <div className={styles.messageContainer}>
        <ListStudent listOfSTD={listOfSTD} setChatData={setChatData} />
        {
          chatData &&  teacherId && (
          <Chat chatData={chatData} teacherMsg={teacherMsg}
           teacherId={teacherId} dmContent={dmContent} setDmContent={setDmContent}/> 
          )
        }
      </div>
    </>
  );
};

export default Message;


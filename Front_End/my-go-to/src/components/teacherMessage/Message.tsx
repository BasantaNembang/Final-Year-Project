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
  const [dmRoomId, setDmRoomId] = useState<string | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [teacherMsg, setTeacherMsg] = useState<TeacherDmMSG[] | null>(null);
  const [listOfSTD, setListOfSTD] = useState<dmMessages[] | []>([]);
  const [dmContent, setDmContent] = useState<DmSubMessages[] | null>(null);
  const [flag, setflag] = useState<boolean>(false);

  const hasRun = useRef(false);

  
  const getAllTeacherMsg = async() =>{  
    if(!teacherId) return;
    const response = await getAllDmMessagesTeacher(teacherId);
    setTeacherMsg(response.data)
  }  

  useEffect(()=>{
     setflag(false)
  }, [chatData]);

  //initial rendering.........
  useEffect(()=>{
  if (hasRun.current) return; 
     hasRun.current = true;   
   getAllTeacherMsg();
  }, [teacherId]);


  useEffect(()=>{
    if(flag === true){
      getAllTeacherMsg();
    }
  }, [flag]);


  const getTheRoomID = () =>{
    if(!teacherMsg) return;  //setting the roomId and Course Id 
    setCourseId(teacherMsg[0].roomId.slice(0, 8))
    setDmRoomId(teacherMsg[0].roomId.slice(0, 8) + "_" + teacherId)
  }

  const defSetLISTData = () =>{
     if(!listOfSTD) return; 
     teacherMsg?.map((each, _)=>{
     setListOfSTD(prev=> [...prev, ...each.dmMessages])})
  }


  useEffect(()=>{
    if(!teacherMsg) return;
    defSetLISTData();
    getTheRoomID();
  }, [teacherMsg]);

    
  return (
    <>
      <div className={styles.messageContainer}>
        <ListStudent listOfSTD={listOfSTD} setChatData={setChatData} />
        <Chat chatData={chatData} dmRoomId={dmRoomId!}  flag={flag} setflag={setflag}
         courseId={courseId!} teacherId={teacherId} dmContent={dmContent} setDmContent={setDmContent}/> 
      </div>
    </>
  );
};

export default Message;

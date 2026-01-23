"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/message.module.css";
import { BsSend } from "react-icons/bs";
import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { DisscussDM } from "@/types/chatData";
import { useHelperContexHook } from "@/context/helperContext";

interface sendMessageProps{
  dmRoomId: string,
  courseId: string,
  userId: string,
  authorID?: string,
  courseName?: string,
  currentUser?: string,
  setflag?: React.Dispatch<React.SetStateAction<boolean>>,
  flag?: boolean
}


const SendMessage = ({dmRoomId, courseId, userId, authorID, courseName, currentUser, flag, setflag}: sendMessageProps) => {

  const { cuurentUser } = useHelperContexHook();

  const [dmMessageSend, setDmMessageSend] = useState<DisscussDM>({
      username: cuurentUser,
      courseId: courseId,
      studentId: userId,
      content:"",
      teacherId: authorID!,
      courseName:courseName!
  });

  const[stompClient, setStompClient] = useState<Client | null>(null);  


  const destination = `/app/dm-message/${dmRoomId}`


    const connectWebSocket = () => {
     const client = Stomp.over(() => new SockJS("http://localhost:8090/ws"));
      client.connect({}, () => {
        setStompClient(client);      
      });
    };

  useEffect(() => {
     connectWebSocket();
      if(setflag){
        setflag(false)
      }
  }, [flag]);



  const trackFiled = (e: React.ChangeEvent<HTMLInputElement>) =>{
    const text = e.target.value;
    if (text !== "") {
      setDmMessageSend(prev=>({...prev, content:text}))
    }     
  }

  useEffect(()=>{
   if(currentUser){
     setDmMessageSend(prev=>({...prev, username:currentUser}))
    }
   setDmMessageSend(prev=>({...prev, courseId:courseId, studentId:userId}))
  },[dmRoomId, userId, currentUser]);


  const sendMessage = async() =>{
    if(stompClient!==null){
        stompClient.publish({
        destination: destination,
        body: JSON.stringify(dmMessageSend)
  })
  if(setflag){
    setflag((prev)=>!prev)
  }
  setDmMessageSend(prev=>({...prev, content:''}))   //now remove the text
 }
}

  return (
    <>
      <div className={styles.sendMessageContainer}>
        <div className={styles.sendInputContainer}>
            <input type="text" name="" id="" placeholder="Type your response....." value={dmMessageSend.content} onChange={trackFiled}/>
        </div>
        <div className={styles.sendBTNContainer} onClick={sendMessage}>
            <button><BsSend /></button>
        </div>
      </div>
     </>
   );
 }

export default SendMessage;


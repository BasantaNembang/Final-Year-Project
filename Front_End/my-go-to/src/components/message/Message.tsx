"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/message.module.css";
import ListDM from "./ListDM";
import MainDM from "./MainDM";
import {  DmSubMessages } from "@/types/chatData";
import { getAllDmMessagesSTD, isConnectedDM } from "@/lib/Chat-Service";
import { useHelperContexHook } from "@/context/helperContext";

//used in teacher-------------------

const Message = () => {

  const [dmMessage, setDmmessage] = useState<DmSubMessages[] | null>(null);

  const { streamData, setDmConnected } = useHelperContexHook();  
 
  const roomId = streamData?.courseDto.course_id as string;
  const authorID = streamData?.courseDto.authorId as string;
  const studentId = streamData?.userId as string;
  

  const author = streamData?.courseDto.author as string;

  const dmRoomId = roomId + "_" + authorID; 


  const getALlDM_Message = async() =>{
   const response = await getAllDmMessagesSTD(dmRoomId, studentId);
   setDmmessage(response.data)
  }


  useEffect(()=>{
    getALlDM_Message();
  }, [ streamData ]);



  //set the connection so that i can send the message
  useEffect(()=>{
    const connectionDM = async() =>{
      try{
        await isConnectedDM(dmRoomId);
        setDmConnected(true);
      }catch(err){console.error(err); }
    }  

    connectionDM();
   },  [dmRoomId]);


  return (
    <>
      <div className={styles.messageContainer}>
        <ListDM author={author}/>
        <MainDM dmMessage={dmMessage} setDmmessage={setDmmessage} author={author} dmRoomId={dmRoomId} authorID={authorID}/>
      </div>
    </>
  );
};

export default Message;

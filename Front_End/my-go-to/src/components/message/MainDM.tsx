"use client";

import React, { useEffect, useRef } from "react";
import styles from "../../styles/message.module.css";
import { DmSubMessages } from "@/types/chatData";
import SendMessage from "./SendMessage";
import { useHelperContexHook } from "@/context/helperContext";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";


interface mainDMProps{
  dmMessage: DmSubMessages[] | null,
  setDmmessage: React.Dispatch<React.SetStateAction<DmSubMessages[] | null>>
  author: string,
  dmRoomId: string,
  authorID: string
}

const MainDM = ({ dmMessage, setDmmessage, author, dmRoomId, authorID }: mainDMProps) => {

 const { cuurentUser, streamData } = useHelperContexHook();

 const courseId = streamData?.courseDto.course_id as string;
 const userId = streamData?.userId as string;
 const courseName = streamData?.courseDto.categoryResponseDTO.subcategory as string;

 const chatRef = useRef<HTMLDivElement | null>(null);
 

   useEffect(() => {
      const connectWebSocket = () => {
        const client = Stomp.over(() => new SockJS("http://localhost:8090/ws"));
        client.connect({}, () => {
          try {
          client.subscribe(`/topic/dm-room/${dmRoomId}`, (message) => {
            const newMessage  = JSON.parse(message.body);
            setDmmessage(newMessage)
          });
          } catch (error) {
            console.error(error);}        
        });
       };
       connectWebSocket();
     }, []);


  useEffect(() => {
    if (chatRef.current) {
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [ dmMessage ]);


  return (
    <div className={styles.mainDivContainer}>
      <div>
        <div className={styles.main_profileContainer}>
          <span className={styles.main_profileP}>s</span>
          <p>{author}</p>
          <span id={styles.roleDM}>Instructor</span>
        </div>
        <hr />
      </div>

      {/* dms  */}
      <div className={styles.dm_messageContainer}>
       {
        dmMessage?.map((each, i)=>(
          // another person
          cuurentUser  !== each.username ? (
              <React.Fragment key={i}>
                <div className={styles.sender}>
                  <span id={styles.dmPp}>{each.username.charAt(0).toUpperCase()}</span>
                  <p>{each.username}</p>
                </div>
                <span id={styles.senderContent}>
                 {each.content}
                </span>
              </React.Fragment> ) :
              
            //you              
            ( <React.Fragment key={i}>
                <div className={styles.user}>
                  <p>{each.username}</p>
                  <span id={styles.dmPp}>{each.username.charAt(0).toUpperCase()}</span>
                </div>
                <span id={styles.youContent}>
                 {each.content}
                </span>
              </React.Fragment>)))
        }
      </div>

      
      {/* for scroll */}
      <div ref={chatRef}/>


      <SendMessage dmRoomId={dmRoomId} authorID={authorID} courseId={courseId}
       userId={userId} courseName={courseName}/>
    </div>
  );
};

export default MainDM;



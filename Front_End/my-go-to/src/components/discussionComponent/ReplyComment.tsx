"use client";

import React, {useState, useEffect, use } from "react";
import styles from "../../styles/replyComment.module.css";
import { FaThumbsUp } from "react-icons/fa";
import { LikeResponse, SubMessage } from "@/types/chatData";
import TimeStamp from "../timeStamp/TimeStamp";
import {  LikeLIb } from "@/lib/Chat-Service";
import { useHelperContexHook } from "@/context/helperContext";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

interface replyCommentProps{
  each: SubMessage
}

const ReplyComment = ({each}: replyCommentProps) => {

  const { messageId } = useHelperContexHook();
  const roomId = messageId[0];
  const mId = messageId[1];
  const sMId = each.smid

  let [subMessage, setSubmessage] = useState<SubMessage | null>(null);
  let [isLiked, setisLiked] = useState<boolean>(false);

  //get the userID for like features  the current user
  const userId = 'user_one'
 

  //frist
  useEffect(()=>{
   setSubmessage(each)
  }, [each]);


   

   const connectWebSocket = () => {
      const client = Stomp.over(() => new SockJS("http://localhost:8090/ws"));
      client.connect({}, () => {
        try {
        client.subscribe(`/topic/likes/${roomId}`, (message) => {
          const newMessage : any = JSON.parse(message.body);   
           setSubmessage(prev => prev?.smid === newMessage.smid ? newMessage : prev );
        });
        } catch (error) {
          console.error(error);}
      });
    };


  useEffect(() => {
    connectWebSocket()
  },
  [messageId]);

  
  useEffect(() => {
    setisLiked(subMessage?.userId.includes(userId) ?? false)
  },
  [subMessage]);



  const likeTheComment = async() =>{
     if(!subMessage){
       return;
     }
     //do the UI change at frist
     const isLiked = subMessage.userId.includes(userId)

     setSubmessage({...subMessage, 
       userId : isLiked ? subMessage.userId.filter(id=>id!==userId) //if liked remove
       : [...subMessage.userId, userId]
     });


     await LikeLIb(roomId, mId, sMId, userId);
  }



   
  return (
    <>
      <div className={styles.replyCommentContainer}>
        <div className={styles.profile}><span>{subMessage?.sender.charAt(0).toUpperCase()}</span></div>
        <div className={styles.comment}>
          <div id={styles.metaData}><span id={styles.user}>{subMessage?.sender}</span>  
             <span id={styles.role}>Instrctor</span>
             <span id={styles.time}>
                {  subMessage?.time &&  ( <TimeStamp time={subMessage.time} />)  }
             </span>
             
          </div>
          <p id={styles.comments} style={{marginTop:'.9rem'}}>{subMessage?.content}</p>
        </div>
        <div id={styles.like} onClick={likeTheComment} style={{color : isLiked ? 'blue' : undefined}}>
          <span ><FaThumbsUp /></span>
           <span>{subMessage?.userId.length}</span>
        </div>
      </div>
    </>
  );
};

export default ReplyComment;

"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/discussionComponent.module.css";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaRegComment } from "react-icons/fa6";
import ReplyText from "./ReplyText";
import ReplyComment from "./ReplyComment";
import { useHelperContexHook } from "@/context/helperContext";
import {  getALlReplyDisscssMessage } from "@/lib/Chat-Service";
import { Messages } from "@/types/chatData";
import TimeStamp from "../timeStamp/TimeStamp";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getJwtToken } from "@/lib/Helper-Two";

interface replyDiscussionProps {
  SetshowReplyMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyDiscussion = ({ SetshowReplyMessage }: replyDiscussionProps) => {

  const {messageId } = useHelperContexHook();
 
  const [showReplyComTXT, SetshowReplyComTXT] = useState<Boolean>(false);  

  const [message, setMessage] = useState<Messages | null>(null);
  const[token, setToken] = useState<string | null>(null);  


  const getReplyMesage = async() =>{
    const data = await getALlReplyDisscssMessage(messageId);
    setMessage(data.data)
  }

  //send the API     
  useEffect(()=>{
    getReplyMesage();
  }, [messageId]);


  const destination = `/app/sub_message/${messageId[0]}/${messageId[1]}`

  const roomId = messageId[0];

  const getTheToken = async() =>{
    const token = await getJwtToken()
    setToken(token.jwtToken)
  }
  
  useEffect(()=>{
   getTheToken()  
  }, []);


  //for real-time
  useEffect(() => {
      const connectWebSocket = () => {
        const client = Stomp.over(() => new SockJS("http://localhost:8090/ws"));
        client.connect({Authorization : `Bearer ${token}`}, () => {
          try {
          client.subscribe(`/topic/sub_room/${roomId}`, (message) => {
            const newMessage  = JSON.parse(message.body);
            setMessage(newMessage)
          });
          } catch (error) {
            console.error(error);}
        });
      };
      connectWebSocket();
    }, [token]);
  

  const backToDiscussions = () => {
    SetshowReplyMessage(false);
  };

  const replyComment = () =>{
    SetshowReplyComTXT(true) 
  }


  return (
    <>
    {
     message !== null && 
      <div className={styles.replyDissContainer}>
        <div className={styles.comment}>
          <button onClick={backToDiscussions}> <IoArrowBackSharp id={styles.backICON}/> Back to Discussions</button> 
           {/* for main comment */}
           <div className={styles.replyContainerDIV} >
            <div className={styles.reply_profile}>
              <span>{message.sender.charAt(0).toUpperCase()}</span>
            </div>
            <div className={styles.containSection}>
            <div className={styles.reply_InfoContainer}>
              <p style={{ display: "inline", fontSize: "1.25rem" }}> {message.sender} </p>
              <span id={styles.role}>STUDENT</span>
              <span style={{color:" #8a7c7c", marginLeft:'.5rem'}}> <TimeStamp time={message.time}/> </span>
            </div>
            <div className={styles.reply_InfoContainer}>
              <p style={{fontSize:'1.2rem', fontWeight: "bold"}}>{message?.content}</p>
            </div>
            </div>
          </div>
          <hr />
          {/* for the reply of the main comment */}
          <div className={styles.replyMainCommentContainer}>
            <div className={styles.hearder}>
              <div style={{fontSize:'1.3rem'}}>{message.subMessages.length} Replies</div>
              <div><button onClick={replyComment}> <FaRegComment /> Add Reply</button></div>
            </div>
             { showReplyComTXT && ( <ReplyText SetshowReplyComTXT={SetshowReplyComTXT} destination={destination} setMessage={setMessage}/>  )   }
             {/* list of all comments */}
             {
              message.subMessages.map((each, _)=>(
               <ReplyComment each={each} key={each.smid}/>
              ))
             }
          </div>
        </div>
        <div className={styles.reply}></div>
      </div>
    }
    </>
  );
};

export default ReplyDiscussion;

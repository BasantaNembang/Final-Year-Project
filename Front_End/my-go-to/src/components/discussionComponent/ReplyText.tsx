"use client";

import React, { useState, useEffect } from "react";
import styles from "../../styles/replyText.module.css";
import { BsSend } from "react-icons/bs";
import { useHelperContexHook } from "@/context/helperContext";
import { Disscuss, Messages } from "@/types/chatData";
import SockJS from "sockjs-client";
import { Client, Stomp } from "@stomp/stompjs";

interface replyTextProps{
   SetshowReplyComTXT: React.Dispatch<React.SetStateAction<Boolean>>,
   destination: string
   setMessage ?: React.Dispatch<React.SetStateAction<Messages | null>>,
   token?: string
}

const ReplyText = ({SetshowReplyComTXT, destination, setMessage, token}: replyTextProps) => {

  const { connected, cuurentUser } = useHelperContexHook();
  const [disscussNote, setDiscussNote] = useState<string>('');
  const[stompClient, setStompClient] = useState<Client | null>(null);  

  const[disscussData, setDisscussData] = useState<Disscuss>({
      sender: cuurentUser,
      content: disscussNote,
  }); 
  
  const trackComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text !== "") {
      setDisscussData(prev=>({...prev, content:text}))
    }      
  }

  //for chat
  useEffect(() => {
    const connectWebSocket = () => {
      if(!token) return;
      const client = Stomp.over(() => new SockJS("http://localhost:8090/ws"));
        client.connect(
        { Authorization : `Bearer ${token}` }, 
        () => {
         setStompClient(client);
        },

        ()=>{
         throw new Error("unable to communicate invalid jwtToken")
        }
      
      );
    };
    connectWebSocket();
  }, [setMessage]);


  const removeTHIS = () =>{
    SetshowReplyComTXT(false)
  }  


  const postComment = () => {
    if(stompClient!==null){
        stompClient.publish({
          destination: destination,
          body: JSON.stringify(disscussData)
        })
        //now refresh the page
       removeTHIS();
    }
  }



  return (
    <>
      <div className={styles.replyTextContainer}>
        <textarea name="" id="" onChange={trackComment}/>
        <div className={styles.bottomBTN}>
           <button id={styles.cancel} onClick={removeTHIS}>Cancel</button>
           <button id={styles.postComment} onClick={postComment}><BsSend /> Post Reply</button>
        </div>
      </div>
    </>
  );
};

export default ReplyText;

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
   setMessage ?: React.Dispatch<React.SetStateAction<Messages | null>>
}

const ReplyText = ({SetshowReplyComTXT, destination, setMessage}: replyTextProps) => {


  const { connected, cuurentUser } = useHelperContexHook();
  let [disscussNote, setDiscussNote] = useState<string>('');
  let[stompClient, setStompClient] = useState<Client | null>(null);  
  

  let[disscussData, setDisscussData] = useState<Disscuss>({
      sender: cuurentUser,
      content: disscussNote,
  }); 


  const trackComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text !== "") {
      setDisscussData(prev=>({...prev, content:text}))
    }      
  }

  const removeTHIS = () =>{
    SetshowReplyComTXT(false)
  }  


  const postComment = () => {
    if(stompClient!==null && connected){
        stompClient.publish({
          destination: destination,
          body: JSON.stringify(disscussData)
        })
        //now refresh the page
       removeTHIS();
    }
  }


  //for chat
  useEffect(() => {
    const connectWebSocket = () => {
      const client = Stomp.over(() => new SockJS("http://localhost:8090/ws"));
        client.connect({}, () => {
         setStompClient(client);
        });
    };
    connectWebSocket();
  }, [setMessage]);




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

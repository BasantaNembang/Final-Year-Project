"use client";

import React, { useState, useEffect } from "react";
import style from "../../styles/discussionComponent.module.css";
import EachDiscussion from "./EachDiscussion";
import ReplyText from "./ReplyText";
import NavBottom from "./NavBottom";
import { getALlDisscussionMessage } from "@/lib/Chat-Service";
import { Messages } from "@/types/chatData";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { getJwtToken } from "@/lib/Helper-Two";

//after the login, in a context make value connected?? so that easy for commication
interface discussionComponentProps {
  SetshowReplyMessage: React.Dispatch<React.SetStateAction<boolean>>,
  roomId: string
}


//for getting total reply... in a real time
export interface totalHelper{
  id: string,
  total: number
}

const DiscussionComponent = ({ SetshowReplyMessage, roomId }: discussionComponentProps) => {

  const[showReplyComTXT, SetshowReplyComTXT] = useState<Boolean>(false);  
  const[message, setMessages] = useState<Messages[]>([]);  
  const[token, setToken] = useState<string | null>(null);  

  const[helper, sethelper] = useState<Messages | null>(null);  
  const[fix, setfix] = useState<totalHelper>({
    id:'',
    total:0
  });  

  const [page, setPage] = useState<number>(0);
  const [currentPageSize, setcurrentPageSize] = useState<number>(0);
  const size = 3;

  const destination  = `/app/message/${roomId}`;

  const askQuestion = () => {
   SetshowReplyComTXT(true)
  }

  //for chat-service
  const getOldMessages = async() =>{
     const response = await getALlDisscussionMessage(roomId, page, size);
     setMessages(response.data)
  }

  const getTheToken = async() =>{
    const token = await getJwtToken()
    setToken(token.jwtToken)
  }

  useEffect(()=>{
    getTheToken()  
  }, []);
  
  useEffect(()=>{
    getOldMessages();  
  }, [page]);

  useEffect(()=>{
    setcurrentPageSize(message.length); 
  }, [message]);


  const updateMessage = (messages: Messages[]) =>{
    setMessages(messages)
  }

  

  useEffect(() => {
    const connectWebSocket = () => {

      if(!token) return;
    
      const client = Stomp.over(() => new SockJS("http://localhost:8090/ws"));
      
      client.connect( {Authorization : `Bearer ${token}`}, 
          () => {
          try {
          client.subscribe(`/topic/room/${roomId}`, (message) => {
            const newMessage  = JSON.parse(message.body);
            updateMessage(newMessage)
          });
          } catch (error) {
            console.error(error);}

          try {
          client.subscribe(`/topic/sub_room/${roomId}`, (message) => {
            const newMessage  = JSON.parse(message.body);
            sethelper(newMessage)
          });
          } catch (error) {
            console.error(error)
          }          
      },
      (error : any) =>{
        throw new Error("Authentication fail in web-socket")
      }
    );    
   };
    connectWebSocket();
  }, [roomId, token]);


  useEffect(()=>{
    if(!helper) return;
      setfix({
        id: helper?.mid,
        total: helper?.subMessages.length
      })
  }, [helper]);


  return (
    <>
      <div className={style.discussionContainer}>
        <div className={style.discussionContainer_header}>
          <p style={{ fontSize: "1.5rem" }}>Q&A Discussion</p>
          <button onClick={askQuestion}>Ask a Questions</button>
        </div>
        
        { showReplyComTXT && ( <ReplyText SetshowReplyComTXT={SetshowReplyComTXT} destination={destination} token={token!}/> )  }
        
        <div style={{ marginTop: "1rem" }}>
          {
            message?.map((each, i)=>
              ( <EachDiscussion each={each} SetshowReplyMessage={SetshowReplyMessage} roomId={roomId}
                fix={fix} key={i}/>) 
            )
          }
        </div>
        
        <div style={{ marginTop: "3rem" }}>
          <NavBottom page={page} setPage={setPage} currentPageSize={currentPageSize}/>
        </div>
        
      </div>
    </>
  );
};

export default DiscussionComponent;

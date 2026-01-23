"use client";

import React, {useState, useEffect, useRef} from "react";
import styles from "../../styles/teacherMessage.module.css";
import SendMessage from "../message/SendMessage";
import { dmMessages, DmSubMessages } from "@/types/chatData";
import { getEmailByID, getUserNameByID } from "@/lib/Auth-Service";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

interface chatInterface{
  chatData: dmMessages | null,
  dmRoomId: string,
  courseId: string,
  teacherId: string,
  dmContent: DmSubMessages[] | null,
  setDmContent: React.Dispatch<React.SetStateAction<DmSubMessages[] | null>>,
  setflag?: React.Dispatch<React.SetStateAction<boolean>>
  flag: boolean
}


const Chat = ({chatData, dmRoomId, courseId, teacherId, dmContent, setDmContent, flag, setflag }: chatInterface) => {

 const [studentName, setStudentName] = useState<string>(''); 
 const [currentUser, setCurrentUser] = useState<string>(''); 
 const [studentEmail, setStudentEmail] = useState<string>('');
 const [userId, setUserId] = useState<string | null>(null);

 const chatRef = useRef<HTMLDivElement | null>(null);

  const getMetaINFO = async () =>{
      if(!chatData) return;
      const data = await getUserNameByID(chatData?.studentId);
      const email = await getEmailByID(chatData?.studentId)      
      setStudentName(data);
      setStudentEmail(email);
  }

  const setTheDmContent = () =>{
    if(!chatData) return;
    setDmContent(chatData.subMessages)
    setUserId(chatData.studentId);
  }

  useEffect(()=>{
    getMetaINFO();
    setTheDmContent();
  }, [chatData]);



  useEffect(()=>{
    const getTheUserNAME = async() =>{
      if(!teacherId) return;
      const userName = await getUserNameByID(teacherId);
      setCurrentUser(userName);
    }
  getTheUserNAME()
  }, [teacherId, chatData]);



   useEffect(() => {
     if (!dmRoomId) return;
     const connectWebSocket = () => {
      const client = Stomp.over(() => new SockJS("http://localhost:8090/ws"));
       client.connect({}, () => {
        try {
         client.subscribe(`/topic/dm-room/${dmRoomId}`, (message) => {
         const newMessage  = JSON.parse(message.body);
         setDmContent(newMessage)

        });
       } catch (error) {
        console.error(error);}        
       }); 

      return () => {
       client.disconnect();
      };        
    };

    connectWebSocket();
   }, [ dmRoomId ]);


  useEffect(() => {
    if (chatRef.current) {
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dmContent]);


  
  if(!chatData){
    return <>
     <div style={{margin:'auto'}}>No messages</div>
    </>
  }


  return (
   <>
    <div className={styles.mainDivContainer}>
      <div>
        <div className={styles.main_profileContainer}>
          <div>
            <span className={styles.main_profileP}>{studentName.charAt(0).toUpperCase()}</span>
          </div>
          <div>
          <p style={{marginTop:".8rem", fontWeight:'bold', fontSize:'1.2rem'}}>{studentName}</p>
          <p style={{color:"#6e6e6e"}}>{studentEmail}</p>
          </div>
        </div>
        <div className={styles.course_INFO_Container}>
            <span style={{color:"#6e6e6e"}}>Course</span>
            <span style={{fontSize:'1.3rem', fontWeight:'bold'}}>{chatData?.courseName}</span>
        </div>
      </div>
      <div className={styles.dm_messageContainer} >        
      {/* dms */}
      {
        dmContent?.map((each, i)=>(
          each.username == studentName ? (
            <React.Fragment key={i}>
              <div className={styles.sender}>
                <span id={styles.dmPp}>{each.username.charAt(0).toUpperCase()}</span>
                  <p>{each.username}</p>
              </div>
              <span id={styles.senderContent}>{each.content}</span>
            </React.Fragment>
          ):
          (
          <React.Fragment key={i}>     
            <div className={styles.user}>
              <p>{each.username}</p>
              <span id={styles.dmPp}>{each.username.charAt(0).toUpperCase()}</span>
            </div>
            <span id={styles.youContent}>{each.content}</span>
            </React.Fragment>
          )))
      }      
    <div  ref={chatRef} />  {/* for scroll */}
    </div>
     <SendMessage dmRoomId={dmRoomId!}  courseId={courseId!} userId={userId!}  currentUser={currentUser} flag={flag} setflag={setflag}/>
    </div> 
    </>
  );
};

export default Chat;

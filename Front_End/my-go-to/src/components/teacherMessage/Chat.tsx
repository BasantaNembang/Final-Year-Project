"use client";

import React, {useState, useEffect, useRef} from "react";
import styles from "../../styles/teacherMessage.module.css";
import SendMessage from "../message/SendMessage";
import { dmMessages, DmSubMessages, TeacherDmMSG } from "@/types/chatData";
import { getEmailByID, getUserNameByID } from "@/lib/Auth-Service";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getJwtToken } from "@/lib/Helper-Two";

interface chatInterface{
  chatData: dmMessages | null,
  teacherId: string | null,
  dmContent: DmSubMessages[] | null,
  setDmContent: React.Dispatch<React.SetStateAction<DmSubMessages[] | null>>,
  teacherMsg: TeacherDmMSG[] | null
}

//used in teacher-------------------
const Chat = ({chatData, teacherId, dmContent, setDmContent, teacherMsg }: chatInterface) => {

 const [studentName, setStudentName] = useState<string>(''); 
 const [currentUser, setCurrentUser] = useState<string>(''); 
 const [studentEmail, setStudentEmail] = useState<string>('');
 const [userId, setUserId] = useState<string | null>(null);
 const [token, setToken] = useState<string>('');

 //added.....
 const [courseId, setCourseId] = useState<string | null>(null);
 const [dmRoomId, setDmRoomId] = useState<string | null>(null);


 const chatRef = useRef<HTMLDivElement | null>(null);


 const getTheToken = async() =>{
    const token = await getJwtToken()
    setToken(token.jwtToken)
  }

 useEffect(()=>{
  getTheToken()  
 }, []);


  const getTheRoomID = () =>{
    if(!chatData) return;  //setting the roomId and Course Id 

    const id = chatData.mid;

    const data = teacherMsg?.filter(each =>
      each.dmMessages.some(f => f.mid === id)
    );

    if(data){
      setCourseId(data[0]?.roomId?.slice(0, 8))
      setDmRoomId(data[0]?.roomId?.slice(0, 8) + "_" + teacherId)
    }
  }


  
 useEffect(() => {
     if (!dmRoomId || !token) return;
     const connectWebSocket = () => {
      const client = Stomp.over(() => new SockJS("http://localhost:8090/ws"));
       client.connect(
        { Authorization: `Bearer ${token}` }, () => {
        try {
         client.subscribe(`/topic/dm-room/${dmRoomId}`, (message) => {
         const newMessage  = JSON.parse(message.body);
         setDmContent(newMessage)
        });
       } catch (error) {
        console.error(error);}        
       },

      ()=>{
      throw new Error("unable to communicate please check the jwtToken")
      });    
   }; 
    connectWebSocket();
  }, [ dmRoomId, token ]);


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

    getTheRoomID();
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
    if (chatRef.current) {
      chatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dmContent]);


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

    {
      dmRoomId && courseId && userId && currentUser && (
       <SendMessage dmRoomId={dmRoomId}  courseId={courseId} userId={userId} currentUser={currentUser}/>
      ) 
    }

    </div> 
    </>
  );
};

export default Chat;

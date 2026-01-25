"use client";

export const dynamic = "force-dynamic"; 

import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/streampage.module.css";
import Link from "next/link";
import { Suspense } from "react";
import { useHelperContexHook } from "@/context/helperContext";
import { IoChevronBackOutline } from "react-icons/io5";
import { TiStarFullOutline } from "react-icons/ti";
import { LuClock } from "react-icons/lu";
import { SiSimpleanalytics } from "react-icons/si";
import { IoBookOutline } from "react-icons/io5";
import { FaRegMessage } from "react-icons/fa6";
import { RiThumbUpLine } from "react-icons/ri";
import { LuMessageCircle } from "react-icons/lu";

import CourseMetaData from "@/components/courseMetaData/CourseMetaData";
import MyNote from "@/components/myNote/MyNote";
import Reviews from "@/components/reviews/Reviews";
import VideoPlayer from "@/components/videoPlayer/VideoPlayer";
import { getStreamURL } from "@/lib/Stream-Backend";
import DiscussionComponent from "@/components/discussionComponent/DiscussionComponent";
import ReplyDiscussion from "@/components/discussionComponent/ReplyDiscussion";
import { createDmRoom, isConnected } from "@/lib/Chat-Service";
import Message from "@/components/message/Message";


const StreamPage = () => {

  const { setIsPrivate, streamData, setConnected } = useHelperContexHook();
  const [flagInfo, SetflagInfo] = useState<boolean>(true);
  const [flagNote, SetflagNote] = useState<boolean>(false);
  const [flagDiscussion, SetflagDiscussion] = useState<boolean>(false);
  const [flagReview, SetFlagReview] = useState<boolean>(false);
  const [flagMessage, SetFlagMessage] = useState<boolean>(false);

  const [showReplyMessage, SetshowReplyMessage] = useState<boolean>(false);
  const [streamURL, setStreamURL] = useState<string>('');

  const didRun = useRef(false);


  if (!streamData || !streamData.courseDto) {
    return <div>Loading...</div>;
  }


  const roomId = streamData?.courseDto.course_id as string;

  //cousreId + authorID
  const dmRoomId = roomId + "_" + streamData?.courseDto.authorId;

  const checkForTheConnection =  async() =>{
    const response = await isConnected(roomId)
    if(response){
       setConnected(true)
    }
  }

  const createRoomDM = async() =>{
     await createDmRoom(dmRoomId);
  }
    

  //for chat-connections
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;    
    createRoomDM()     // for dms
    checkForTheConnection();  //for the disscussion
    setIsPrivate(true)   //to remove the stuffs of navbar
  }, [ ]);




  //for node
  const user_ID = streamData?.userId as string;
  const enroll_ID = streamData?.enroll_id as string;

  //for comments
  const course_ID = streamData?.courseDto.course_id as string;

  //for streaming
  const stream_ID = streamData?.courseDto.stream_id as string;


  //call the backend and get the URL
  const get_STREAM_URL = async(streamId: string) =>{
    const URL =  await getStreamURL(streamId)
    setStreamURL(URL?.data)
  }
  
  useEffect(()=>{
    get_STREAM_URL(stream_ID);
  }, [stream_ID]);

  


    
  const openDashBoard = (text: string) =>{
    if (text === "courseInfo") {
      SetflagInfo(true);
      SetflagNote(false);
      SetflagDiscussion(false);
      SetFlagMessage(false)
      SetFlagReview(false)}
    if (text === "courseNote") {
      SetflagNote(true);
      SetflagInfo(false);
      SetflagDiscussion(false);
      SetFlagMessage(false)
      SetFlagReview(false)}
    if (text === "chat") {
      SetflagDiscussion(true);   
      SetflagNote(false);
      SetflagInfo(false);
      SetFlagMessage(false)
      SetFlagReview(false)}
    if (text === "reviews") { 
      SetFlagReview(true)
      SetflagDiscussion(false);  
      SetFlagMessage(false)
      SetflagNote(false);
      SetflagInfo(false);
    }      
    if (text === "message") { 
      SetFlagMessage(true)
      SetflagDiscussion(false);   
      SetflagNote(false);
      SetflagInfo(false);
      SetFlagReview(false)
    }   
  }


  return (
    <>
      <div className={styles.streamContainer}>
        <Link href="/learnings">
          <span className={styles.topSection}><IoChevronBackOutline /> <button onClick={()=>setIsPrivate(false)}>Back to my Learning</button> </span>
        </Link>

        <Suspense fallback={<div>Loading...</div>}>
          <div className={styles.videoContainer}>
            <VideoPlayer streamURL={streamURL} />
            <h3>{streamData?.courseDto.categoryResponseDTO.subcategory}</h3>
            <p>by {streamData?.courseDto.author}</p>
            <div className={styles.videoMetaData}>
              <ul>
                <li> <span><TiStarFullOutline /></span> 4.8</li>
                <li> <span><LuClock /></span> {streamData?.courseDto.time} hours</li>
                <li><span><SiSimpleanalytics /></span> {streamData?.courseDto.level}</li>
              </ul>
            </div>
          </div>
        </Suspense>
       <div className={styles.courseMetaData}>
       <hr style={{color:'whitesmoke'}}/>
       <div className={styles.courses}>
          <div className={styles.titleINFO}>
            <ul>
              <li style={{color: flagInfo ? "blue" : "" }}> <IoBookOutline style={{fontSize:'1.2rem', marginLeft:'.5rem', marginTop:'.5rem'}}/> <button onClick={()=>openDashBoard("courseInfo")} style={{color: flagInfo ? "blue" : "" }}> Overviews </button> {flagInfo && ( <span></span> ) }  </li>
              <li style={{color: flagNote ? "blue" : "" }}> <IoBookOutline style={{fontSize:'1.4rem', marginLeft:'.5rem', marginTop:'.5rem'}}/> <button onClick={()=>openDashBoard("courseNote")} style={{color: flagNote ? "blue" : "" }}> Notes </button> {flagNote && ( <span></span> ) }  </li>
              <li style={{color: flagDiscussion ? "blue" : "" }}> <FaRegMessage style={{fontSize:'1.4rem', marginLeft:'.5rem', marginTop:'.5rem'}}/> <button onClick={()=>openDashBoard("chat")} style={{color: flagDiscussion ? "blue" : "" }}> Discussions </button> {flagDiscussion && ( <span></span> )}</li>
              <li style={{color: flagMessage ? "blue" : "" }}> <LuMessageCircle style={{fontSize:'1.4rem', marginLeft:'.5rem', marginTop:'.5rem'}}/> <button onClick={()=>openDashBoard("message")} style={{color: flagMessage ? "blue" : "" }}> Messages </button> {flagMessage && ( <span></span> )}</li>
              <li style={{color: flagReview ? "blue" : "" }}> <RiThumbUpLine style={{fontSize:'1.4rem', marginLeft:'.5rem', marginTop:'.5rem'}}/> <button onClick={()=>openDashBoard("reviews")} style={{color: flagReview ? "blue" : "" }}> Reviews </button> {flagReview && ( <span></span> ) }  </li>
            </ul>
          </div>   
          <div className={styles.dynamicContent} style={{display: showReplyMessage ? 'none' : 'block'}}>
            {/* comment only for testing */}
            {
              flagInfo && 
              ( <CourseMetaData  />  )
             }
             {
              flagNote && ( <MyNote user_ID={user_ID} enroll_ID={enroll_ID}/> )
             }
             {
              flagDiscussion && ( <DiscussionComponent SetshowReplyMessage={SetshowReplyMessage} roomId={roomId}/> )
             }
             {
              flagMessage && ( <Message />  )
             }
             {
              flagReview && ( <Reviews course_ID={course_ID}/>  )
             }
          </div>

          {/* reply the discussion */}
          {
            showReplyMessage && ( <ReplyDiscussion SetshowReplyMessage={SetshowReplyMessage}/> )
          }
        </div>
        </div>
      </div>
    </>
  );
};

export default StreamPage;

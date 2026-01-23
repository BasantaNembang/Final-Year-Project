import React from "react";
import style from "../../styles/discussionComponent.module.css";
import { Messages } from "@/types/chatData";
import { useHelperContexHook } from "@/context/helperContext";
import TimeStamp from "../timeStamp/TimeStamp";
import { totalHelper } from "./DiscussionComponent";

interface eachDiscussionProps {
  each: Messages,
  SetshowReplyMessage: React.Dispatch<React.SetStateAction<boolean>>,
  fix : totalHelper,
  roomId: string
}

const EachDiscussion = ({each, SetshowReplyMessage, fix, roomId }: eachDiscussionProps) => {

  const { setMessageId } = useHelperContexHook();

  const showReply = () => {
    SetshowReplyMessage(true)

    //save the id in context and then get
    setMessageId([roomId, each.mid])
  };

  return (
    <>
      <div className={style.eachContainerDIV} onClick={showReply}>
        <div className={style.profile}>
          <span>{each.sender.charAt(0).toUpperCase()}</span>
        </div>
        <div className={style.containSection}>
          <div className={style.InfoContainer}>
            <p style={{ display: "inline", fontWeight: "bold",fontSize: "1.2rem" }}> {each.sender} </p>
            <span style={{color:" #8a7c7c", marginLeft:'.5rem'}}> <TimeStamp time={each.time}/> </span>
          </div>
          <div className={style.InfoContainer}>
            <p>{each.content}</p>
          </div>
          <div className={style.InfoContainer}>
            {
              fix.id === each.mid ?  (  <span style={{color:"blue"}}> { fix.total }  replies</span>  ) :
               (  <span style={{color:"blue"}}> {each.subMessages.length}  replies</span>  ) 
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default EachDiscussion;

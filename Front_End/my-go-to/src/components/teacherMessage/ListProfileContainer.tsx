"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/teacherMessage.module.css";
import { dmMessages } from "@/types/chatData";
import { getUserNameByID } from "@/lib/Auth-Service";

interface ListProfileContainerProps {
  each: dmMessages,
  setChatData: any,
}

const ListProfileContainer = ({ each, setChatData }: ListProfileContainerProps) => {
  let [senderName, setSenderName] = useState<string>('');


  useEffect(()=>{
    const getTheUSER_NAME = async () =>{
      const data = await getUserNameByID(each.studentId);
      setSenderName(data);
    }
    getTheUSER_NAME();
  }, [each]);


  const goToChat = () =>{
    setChatData(each);  
  }


  return (
    <>
      <div className={styles.profileContainer} onClick={goToChat}>    
        <div>
          <span className={styles.profileP}>{senderName.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <p className={styles.listSTD_Name}>{senderName}</p>
        </div>
      </div>
    </>
  );
};

export default ListProfileContainer;

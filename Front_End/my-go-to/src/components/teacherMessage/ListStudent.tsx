"use client";

import React from "react";
import styles from "../../styles/teacherMessage.module.css";
import { dmMessages } from "@/types/chatData";
import ListProfileContainer from "./ListProfileContainer";

interface ListStudentProps {
  listOfSTD: dmMessages[] | null,
  setChatData: any,
}

const ListStudent = ({ listOfSTD, setChatData }: ListStudentProps) => {

  return (
    <>
      <div className={styles.listDMContainer}>
        <div>
          <p className={styles.listSTD_p}>Student Messages</p>
        </div>
        <hr id={styles.line} />

        {
        listOfSTD?.map((each, i) =>
          ( <ListProfileContainer each={each} setChatData={setChatData} key={i} /> ))
        }
      </div>
    </>
  );
};

export default ListStudent;

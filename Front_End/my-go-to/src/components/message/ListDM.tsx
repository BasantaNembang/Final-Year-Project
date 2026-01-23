import React from "react";
import styles from "../../styles/message.module.css";

interface listDmProps{
  author: string
}

const ListDM = ({author}: listDmProps) => {
  return (
    <>
      <div className={styles.listDMContainer}>
        <p>Messages</p>
        <span id={styles.dm}>Direct messaging</span>
        <hr id={styles.line}/>
        <div className={styles.profileContainer}>
          <span className={styles.profileP}>{author.charAt(0).toUpperCase()}</span>
          <p style={{fontSize:'1rem', fontWeight:"bold"}}>{author}</p>
        </div>
      </div>
    </>
  );
};

export default ListDM;

"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/myNote.module.css";
import { toast } from "react-toastify";

interface MyNoteProps {
  user_ID: string;
  enroll_ID: string;
}

interface MyNodeTypes {
  nodeText: string;
  user_ID: string;
  enroll_ID: string;
}

const MyNote = ({ user_ID, enroll_ID }: MyNoteProps) => {
  let [myNodeTextLIST, SetMynodeTextLIST] = useState<MyNodeTypes[]>([]);
  let [nodeText, SetnodeText] = useState<string>("");

  const storeNode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text !== "") {
      SetnodeText(text);
    }
  };
  

  //save node
  const saveNode = () => {
    if (!nodeText.trim()) {
      return;
    }
     //check if previously saved or not if yes then simply update it  ::some return boolean 
    const IsPresent = myNodeTextLIST.some((node=>node.enroll_ID === enroll_ID));
    if(IsPresent){  //update
      const oldData = [...myNodeTextLIST]
      const updatedData = oldData.map((node, _)=>(node.enroll_ID === enroll_ID ? { enroll_ID: enroll_ID, user_ID: user_ID, nodeText: nodeText  }: node))
      localStorage.setItem("node", JSON.stringify(updatedData));
    }else{          //new one
      const myNodeTextOBJ: MyNodeTypes = { nodeText: nodeText, user_ID: user_ID, enroll_ID: enroll_ID };
      const updated = [...myNodeTextLIST, myNodeTextOBJ];
      SetMynodeTextLIST(updated);
      localStorage.setItem("node", JSON.stringify(updated));
    }
    toast.success("node added.......");
  };


  //get notes
  useEffect(() => {
    const data = localStorage.getItem("node");
    if (data) {
      const refineData: MyNodeTypes[] = JSON.parse(data);
      SetMynodeTextLIST(refineData)  //maintains the list..........
      
      const note = refineData.find(each => each.enroll_ID === enroll_ID);
      SetnodeText(note?.nodeText!)
    }
  }, []);

  return (
    <>
      <div className={styles.myNoteContainer}>
        <h3>My Note</h3>
        <textarea name="" id="" onChange={storeNode} value={nodeText}/>
        <button onClick={saveNode}>Save Notes</button>
      </div>
    </>
  );
};

export default MyNote;

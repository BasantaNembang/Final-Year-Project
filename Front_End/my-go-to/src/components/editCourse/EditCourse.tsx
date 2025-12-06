"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/editCourse.module.css";
import { MdOutlineEdit } from "react-icons/md";
import EditModal from "@/modal/EditModal";
import { DarftContextDataType } from "@/types/draftContext";
import { useDraftContexHook } from "@/context/DraftContext";
import { toast } from "react-toastify";

interface EditCourseProps {
  draftCourse: DarftContextDataType | null;
  SetDraftCourse: React.Dispatch< React.SetStateAction<DarftContextDataType | null> >;
  courseIndex: number
}

const EditCourse = ({ draftCourse, SetDraftCourse , courseIndex }: EditCourseProps) => {
  let [flag, Setflag] = useState<boolean>(false);

  let [editableData, SeteditableData] = useState<number | string | File | string[] | null>(null);

  let [payLoad, SetpayLoad] = useState<string | null>(null);

  let [category, Setcategory] = useState<string [] | null>(null);
  
  const { dispatch } = useDraftContexHook();

  

  const editContent = (data: File | string | number | string[], payloadData: string) => {
    Setflag((prev) => !prev);
    SeteditableData(data) 
    SetpayLoad(payloadData) 
  };

  useEffect(() => {
    if (flag) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [flag]);

  useEffect(()=>{  //for category
    const constData = [String(draftCourse?.price), draftCourse?.level, String(draftCourse?.time), draftCourse?.category];
    Setcategory(constData as string[])
  }, [draftCourse]);

  const backToEdit = () => {
    SetDraftCourse(null);
  };
   
  const removeVideo = () => {
    dispatch({type:"deleteDraftData", payload:courseIndex})
    toast.success("video deleted successfully")
  };

  const uploadVideo = () =>{
    //move to create course

  }

  return (
    <>
      <div className={styles.MainContainer}>
        <h4>Edit Course</h4>
        {/* div */}
        <div className={styles.editCourseContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.videoContainer}>
              {draftCourse?.video && (
                <div className={styles.videoShowContainer}>
                  <video
                    id="videoPlayer"
                    controls
                    style={{ width: "100%", height: "auto" }}
                  >
                    <source
                      src={URL.createObjectURL(draftCourse?.video)}
                      type="video/mp4"
                    />
                  </video>
                </div>
              )}
              {draftCourse?.video ? (
                <span
                  onClick={() =>
                    editContent(draftCourse.video!, "video")
                  }
                >
                  <MdOutlineEdit />
                </span>
              ) : null}
            </div>
            <div className={styles.leftContainDiv}>
              <p>{draftCourse?.title}</p>
              <span onClick={()=>editContent(draftCourse?.title!, "Title")}>
                <MdOutlineEdit />
              </span>
            </div>
            <div className={styles.leftContainDiv}>
              <p>{draftCourse?.description}</p>
              <span onClick={()=>editContent(draftCourse?.description!, "Description")}>
                <MdOutlineEdit />
              </span>
            </div>
            <div className={styles.leftContainCategory}>
              <div>
                <span>{draftCourse?.category.toUpperCase()}</span>
              </div>
              <div>
                <span>{draftCourse?.level}</span>
              </div>
              <div>
                <span><strong>RS :</strong> {draftCourse?.price}</span>
              </div>
              <div>
                <span>{draftCourse?.time} hrs</span>
              </div>      
             <span onClick={()=>{editContent(category as string[], "Category")}} id={styles.categorySpan}>
                <MdOutlineEdit />
              </span>                                    
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.thumnailImage}>
              <figure>
                <img src={URL.createObjectURL(draftCourse?.image as File)} alt="Image" />
              </figure>
             <span onClick={()=>editContent(draftCourse?.image!, "Thumnail_Image")} id={styles.imageSpan}>
                <MdOutlineEdit />
              </span>    
            </div>
            <div className={styles.Learn}>
               <p>What You`ll learn</p>
               <ul>
                {
                  draftCourse?.objectives.map((each, i)=>(
                   <li key={i}>{each}</li>
                  ))
                }
               </ul>   
              <span onClick={()=>editContent(draftCourse?.objectives!, "Learn")}>
                <MdOutlineEdit />
              </span>                                 
            </div>
            <div className={styles.Requirements}>
               <p>Requirements</p>
               <ul>
                {
                  draftCourse?.requirements.map((each, i)=>(
                   <li key={i}>{each}</li>
                  ))
                }
               </ul>     
             <span onClick={()=>editContent(draftCourse?.requirements!, "Requirements")}>
               <MdOutlineEdit />
              </span>                                  
             </div>
          </div>
        </div>
        {/* button */}
        <div className={styles.btnSection}>
          <button onClick={backToEdit}>Back</button>
          <button onClick={removeVideo}>Delete Draft</button>
          <button onClick={uploadVideo}>Upload</button>
        </div>
      </div>

      {/* modal */}
      {flag && <EditModal Setflag={Setflag} editableData={editableData} SeteditableData={SeteditableData}
       payLoad={payLoad} courseIndex={courseIndex}/>}
    </>
  );
};

export default EditCourse;

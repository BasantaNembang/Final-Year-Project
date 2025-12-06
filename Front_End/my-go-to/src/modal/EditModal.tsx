"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "../styles/editModal.module.css";
import { useDraftContexHook } from "@/context/DraftContext";
import { toast } from "react-toastify";

interface SetflagProps {
  Setflag: React.Dispatch<React.SetStateAction<boolean>>;
  editableData: number | string | File | string[] | null;
  SeteditableData: React.Dispatch< React.SetStateAction<number | string | File | string[] | null> >;
  payLoad: string | null;
  courseIndex: number;
}

const EditModal = ({Setflag,  editableData,  SeteditableData,  payLoad,  courseIndex,}: SetflagProps) => {
  let [flag, SetFlag] = useState<boolean>(false);
  let [Fieldflag, SetFieldFlag] = useState<boolean>(false);
  let [videoMetaData, SetvideoMetaData] = useState<File | null>(null);
  let videoRef = useRef<HTMLVideoElement>(null);
  let [copyCategoryData, SetCopyCategoryData] = useState<string[] | null>(null);
  let [objectives, SetObjectives] = useState<string[]>(['','','']);
  let [requirements, SetRequirements] = useState<string[]>(['','']);


  const { dispatch } = useDraftContexHook();  //useContext and reducer


  useEffect(() => {
    if (editableData instanceof File && payLoad === "video") {
      SetFlag(true);
      SetvideoMetaData(editableData)
      videoRef.current?.load(); //reload the video tag
    }
    else if(payLoad === "Learn"){
     SetObjectives(editableData as string[])
    }
    else if(payLoad === "Requirements")
      SetRequirements(editableData as string[])
    //copy caregory data
    Array.isArray(editableData) ? SetCopyCategoryData(editableData) : undefined
  }, [editableData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      SeteditableData(e.target.files[0]);
    }
  };

  const trackFiled = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    SetFieldFlag(true);
    SeteditableData(e.target.value);
  };

  const changeThumnailImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files!==null){
     SeteditableData(e.target.files[0])
     SetFieldFlag(true);
    }
  };

  const addNewLeanrings = () => {
     if(Array.isArray(objectives)){
      const tmepData = [...objectives, '']
      SetObjectives(tmepData)
     }
  };

  const addNewRequirements = () => {
     if(Array.isArray(requirements)){
      const tmepData = [...requirements, '']
      SetRequirements(tmepData)
     }
  };  

  const removeObjectives = () =>{
    const newObjective = [...objectives];
    newObjective.pop();
    SetObjectives(newObjective);
  }

  const removeRequrements = () =>{
    const newRequirements = [...requirements];
    newRequirements.pop();
    SetRequirements(newRequirements);
  }



  const tarckObjectives = (e :React.ChangeEvent<HTMLInputElement>, i:number) =>{
     if(e.target.value!==null){
        let OldObjectivesData = [...objectives];
        OldObjectivesData[i] = e.target.value;
        SetObjectives(OldObjectivesData);
        SetFieldFlag(true);
      }
  }

  const tarckRequirements = (e :React.ChangeEvent<HTMLInputElement>, i:number) =>{
     if(e.target.value!==null){
        let OldRequerementsData = [...requirements];
        OldRequerementsData[i] = e.target.value;
        SetRequirements(OldRequerementsData);
        SetFieldFlag(true);
      }
  }


  //change category
  const trackCategory = (e:  ChangeEvent<HTMLSelectElement | HTMLInputElement>, i: number) => {
    if(Array.isArray(copyCategoryData)){
     SetFieldFlag(true);
     const tempData = [...copyCategoryData]
     tempData[i] = e.target.value
     SetCopyCategoryData(tempData);
    }
  }


  
  const saveEditedDATA = () => {
    if (Fieldflag === true) {
      if (payLoad === "Title") {
        dispatch({
          type: "updateTitle",
          payload: { title: editableData as string, index: courseIndex },
        });
      } else if (payLoad === "Description") {
        dispatch({
          type: "updateDescription",
          payload: { title: editableData as string, index: courseIndex },
        });
      }
       else if (payLoad === "Category") {
        dispatch({
          type: "updateCategory",
          payload: { title: copyCategoryData as string[], index: courseIndex },
        });
      }
      else if (payLoad === "Thumnail_Image") {
        dispatch({
          type: "updateThumanilURL",
          payload: { title: editableData as File , index: courseIndex },
        });
      }
      else if (payLoad === "Learn") {
        dispatch({
          type: "updateObjective",
          payload: { title: objectives as string[] , index: courseIndex },
        });
      }
      else if (payLoad === "Requirements") {
        dispatch({
          type: "updateRequirements",
          payload: { title: requirements as string[] , index: courseIndex },
        });
      }

     toast.success(`${payLoad} Updated!!`);
     Setflag(false); //remove modal
    }
  };
   

  return (
    <>
      <div className={styles.editModal_wrapper} onClick={() => Setflag((prev) => !prev)}/>
      <div className={styles.editModal_conatiner}>
        {flag ? (
          <div className={styles.videoConatiner}>
            <div className={styles.videoShowContainer}>
              <video
                ref={videoRef}
                id="videoPlayer"
                controls
                style={{ width: "100%", height: "auto" }}
              >
                <source
                  src={
                    videoMetaData instanceof File
                      ? URL.createObjectURL(videoMetaData as File)
                      : undefined
                  }
                  type="video/mp4"
                />
              </video>
              <label htmlFor="videoUpload">X</label>
              <input
                type="file"
                name=""
                id="videoUpload"
                accept="video/*"
                onChange={handleFileChange}
              />
            </div>
          </div>
        ) : (
          <>
            <div className={styles.infoContainer}>
              <header>{payLoad}</header>
              <div className={styles.titleInputDiv}>
                {(() => {
                  switch (payLoad) {
                    case "Title":
                      return (
                        <input
                          type="text"
                          name=""
                          id=""
                          value={editableData as string}
                          onChange={(e) => trackFiled(e)}
                        />
                      );
                    case "Description":
                      return (
                        <textarea
                          name=""
                          id=""
                          value={editableData as string}
                          onChange={(e) => trackFiled(e)}
                        ></textarea>
                      );
                    case "Category":
                      return (
                        <>
                          <div className={styles.leftDown}>
                            <div className={styles.selectLeftDown}>
                              <div>
                                <label htmlFor="category">Category</label>{" "}
                                <br />
                                <select
                                  name="category"
                                  id="cars"
                                  value={Array.isArray(copyCategoryData)? copyCategoryData[3] : undefined}
                                  onChange={(e)=>trackCategory(e, 3)}
                                >
                                  <option value="business">BUSINESS</option>
                                  <option value="it">IT</option>
                                  <option value="medicine">MEDICINE</option>
                                  <option value="design">DESIGN</option>
                                  <option value="marketing">MARKETING</option>
                                  <option value="music">MUSIC</option>
                                  <option value="photo">PHOTO</option>
                                </select>
                              </div>

                              <div>
                                <label htmlFor="cars">Level</label> <br />
                                <select
                                  name="level"
                                  id="cars"
                                  value={Array.isArray(copyCategoryData)? copyCategoryData[1] : undefined}
                                  onChange={(e)=>trackCategory(e, 1)}
                                >
                                  <option value="volvo">Select Level</option>
                                  <option value="EASY">EASY</option>
                                  <option value="MEDIUM ">MEDIUM </option>
                                  <option value="HARD">HARD</option>
                                </select>
                              </div>
                            </div>
                            <div className={styles.normalLeftDown}>
                              <div>
                                <label htmlFor="course_price">Price(Rs)</label>{" "}
                                <br />
                                <input
                                  type="number"
                                  name="price"
                                  id=""
                                  value={Array.isArray(copyCategoryData)? copyCategoryData[0] : undefined}
                                  onChange={(e)=>trackCategory(e, 0)}
                                />
                              </div>
                              <div>
                                <label htmlFor="course_time">
                                  Duration(hours)
                                </label>{" "}
                                <br />
                                <input
                                  type="number"
                                  name="time"
                                  id=""
                                  value={Array.isArray(copyCategoryData)? copyCategoryData[2] : undefined}
                                  onChange={(e)=>trackCategory(e, 2)}
                                />
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    case "Thumnail_Image":
                      return (
                        <>
                          <figure>
                            <img
                              src={URL.createObjectURL(editableData as File)}
                              alt="Image"
                            />
                            <label htmlFor="changeThumnailImage" >X</label>
                            <input type="file" name="" id="changeThumnailImage" onChange={(e)=>changeThumnailImage(e)} style={{display:"none"}}/>
                          </figure>
                        </>
                      );
                    case "Learn":
                      return (
                        <>
                          <div className={styles.learnContiner}>
                            {Array.isArray(objectives) &&
                              objectives.map((each, i) => (
                                  <div key={i}>
                                    <input
                                      type="text"
                                      value={each}
                                      name=""
                                      id=""
                                      onChange={(e)=>tarckObjectives(e, i)}
                                    />
                                  { i>2 && <span className={styles.cancelObjetivies} onClick={removeObjectives}>X</span>   }   
                                  </div>
                              ))}
                            <button onClick={addNewLeanrings}>
                              + Add more Learnings
                            </button>
                          </div>
                        </>
                      );

                    case "Requirements":
                      return (
                        <>
                          <div className={styles.learnContiner}>
                            {Array.isArray(requirements) &&
                              requirements.map((each, i) => (
                                    <>
                                      <div key={i}>
                                          <input
                                            type="text"
                                            value={each}
                                            name=""
                                            id=""
                                            onChange={(e)=>tarckRequirements(e, i)}
                                          />
                                        { i>1 && <span className={styles.cancelObjetivies} onClick={removeRequrements}>X</span>   }   
                                        </div>                                    
                                    </>
                              ))}
                            <button onClick={addNewRequirements}>
                              + Add more Requirements
                            </button>
                          </div>
                        </>
                      );                        

                    default:
                      break;
                  }
                })()}
              </div>
            </div>
          </>
        )}

        <div className={styles.btnSection}>
          <button onClick={saveEditedDATA}>Save</button>
        </div>
      </div>
    </>
  );
};

export default EditModal;

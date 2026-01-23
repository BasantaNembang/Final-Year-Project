"use client";

import React, { useState,ChangeEvent, useEffect } from "react";
import styles from "../../styles/addCourse.module.css";
import { CiImageOn } from "react-icons/ci";
import VideoUpload from "../videoUpload/VideoUpload";
import { saveCourse } from "@/lib/Course-Backend";
import { dto } from "@/types/courseData";
import { toast } from 'react-toastify';
import { useDraftContexHook } from "@/context/DraftContext";
import axios from "axios";



interface userIdType {
  userId: string
}


const AddCourse = () => {

  let [imageUrl, SetimageUrl] =useState<string | null>(null);
  let [objectives, setObjectives] = useState<string[]>(['','','']);
  let [requirements, setRequirements] = useState<string[]>(['', '']);

  //for VideoUpload
  let [selectedFile, setSelectedFile] = useState<File | null>(null);
  let [imageFile, setimageFile] = useState<File | null>(null);
  let [progress, setProgress] = useState<number>(0);
  let [uploading, setUploading] = useState<boolean>(false);

  const {dispatch} = useDraftContexHook();
  
  
  let [inputValue, setinputValue] = useState<dto>({
        course_id: "",
        author: "",
        description: "",
        level: "",
        time: 0,
        thumbnail_url: "",
        create_at: null,
        stream_id: "",
        price: 0,
        category: "",
        title: "",        
        objectives: [], 
        requirements: []
  });
   
  const getAuthorID = async ()  =>{
    const userID  = await axios.get<userIdType>('/api/auth/getId')
    if(userID.status === 200){
      return userID.data;
     }{
      throw new Error('some thing went wrong here ')
     }
  }

  useEffect(()=>{   
   getAuthorID().then((id)=>{
     inputValue.author = id!.userId;
   })
  }, [inputValue]);
  
  
  const trackField = (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement  >):void =>{
    const { name, value } = e.target as HTMLInputElement;
    setinputValue({ ...inputValue, [name]: value }); 
  }



  const disPlayImage = (e: React.ChangeEvent<HTMLInputElement>) => {
       if(e.target.files!=null){
           const objectUrl = URL.createObjectURL(e.target.files[0]);
           SetimageUrl(objectUrl)    
           setimageFile(e.target.files[0])       
       }
  }
 
  const removeImage = () =>{
      SetimageUrl(null)
  }

  const placeValueInObjective = (e :React.ChangeEvent<HTMLInputElement>, i:number) =>{
      if(e.target.value!==null){
        let OldObjectivesData = [...objectives];
        OldObjectivesData[i] = e.target.value;
        setObjectives(OldObjectivesData);
      }
  }

  const placeValueInRequirements = (e :React.ChangeEvent<HTMLInputElement>, i:number) =>{
      if(e.target.value!==null){
        let OldRequirementData = [...requirements];
        OldRequirementData[i] = e.target.value;
        setRequirements(OldRequirementData);
      }
  }


  const addNewObjective = () =>{
    setObjectives(prevItems => [...prevItems, ""]);
  }

  const addNewRequirements  = () =>{
    setRequirements(prevItems => [...prevItems, ""]);
  }


  const removeObjective =  () =>{   
    const newObjective = [...objectives];
    newObjective.pop();
    setObjectives(newObjective);
  }

  const removeRequirements  =  () =>{   
    const newRequrirements = [...requirements];
    newRequrirements.pop();
    setRequirements(newRequrirements);
  }




  const saveDraft = () =>{

     let dto = {
      ...inputValue,
      objectives: objectives,
      requirements: requirements,
      video: selectedFile,
      image: imageFile
    }
    

    dispatch({type:"draftData", payload:dto});

    
      setinputValue({
        course_id: "",
        author: "",
        description: "",
        level: "",
        time: 0,
        thumbnail_url: "",
        create_at: null,
        stream_id: "",
        price: 0,
        category: "",
        title: "",        
        objectives: [], 
        requirements: [], 
     });
  
       
    setObjectives(["", "", ""]);
    setRequirements(["", ""]);
    setSelectedFile(null);
    SetimageUrl(null)
    toast.success("Course Drafted Successfully...")

  }

  //send to backend
  const sendForm = async(e: React.MouseEvent<HTMLButtonElement>) =>{

    setUploading(true);
    setProgress(0);
    
    let dto = {
      ...inputValue,
      objectives: objectives,
      requirements: requirements,
    }
    
    let formData = new FormData()
     if(selectedFile!=null){
        formData.append("video", selectedFile);}
     if(imageFile!=null){
        formData.append("image", imageFile); }

     //new Blob(JSON.stringify(dto) make json data is converted to String before sending
     formData.append("dto", new Blob([JSON.stringify(dto)], {  type:"application/json"} ))

     let response = await saveCourse(formData, setProgress);
     if(response === true){
        setinputValue({
        course_id: "",
        author: "",
        title: "",
        description: "",
        level: "",
        time: 0,
        thumbnail_url: "",
        create_at: null,
        stream_id: "",
        price: 0,
        category: "",
        objectives: [], 
        requirements: [], 
     });

    setObjectives(["", "", ""])
    setRequirements(["", ""])
    setSelectedFile(null)
    SetimageUrl(null)
     //remove thumnail image and video
    toast.success("Course Uploaded Successfully...")

    }else{
      toast.info(response.msg)
    }
       

  }




  return (
    <div className={styles.addCourseContainer}>
      <h3>Create New Course</h3>

      <div className={styles.addCourse}>
        <div className={styles.leftSection}>
          <div className={styles.leftTop}>
            <div>
              <label htmlFor="course_title">Course Title</label> <br />
              <input type="text" name="title" id="course_title" placeholder="Enter your course title"
              value={inputValue.title}   onChange={trackField}  />
            </div>
            <div>
              <label htmlFor="descibe_course">Descibe Course:</label> <br />
              <textarea
                id="descibe_course"
                name="description"
                placeholder="Descibe what your student will learn in your course"
                value={inputValue.description}   onChange={trackField}              
              ></textarea>
            </div>
          </div>

          <div className={styles.leftDown}>
            <div className={styles.selectLeftDown}>
              <div>
                <label htmlFor="category">Category</label> <br />
                <select name="category" id="cars"
                  value={inputValue.category}  onChange={trackField} >
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
                <select name="level" id="cars"
                 value={inputValue.level}  onChange={trackField}>
                  <option value="volvo">Select Level</option>
                  <option value="EASY">EASY</option>
                  <option value="MEDIUM ">MEDIUM </option>
                  <option value="HARD">HARD</option>
                </select>
              </div>
            </div>
            <div className={styles.normalLeftDown}>
              <div>
                <label htmlFor="course_price">Price(Rs)</label> <br />
                <input type="number" name="price" id="" 
                 value={inputValue.price}   onChange={trackField}  />
              </div>
              <div>
                <label htmlFor="course_time">Duration(hours)</label> <br />
                <input type="number" name="time" id=""
                 value={inputValue.time}   onChange={trackField} />
              </div>              
            </div>
          </div>
     


        {/* add video section here */}
         <div className={styles.videoSection}>
            <VideoUpload selectedFile={selectedFile} setSelectedFile={setSelectedFile} 
            progress={progress} setProgress={setProgress}
            uploading={uploading} setUploading={setUploading}/>
         </div>
  


        </div>

        <div className={styles.rightSection}>
          <div className={styles.thunailInfo}>
            <p>Course Thumbnail</p>       
           <div className={styles.custom_file_upload}>
             <div> <CiImageOn id={styles.imageIcon}/></div>
             <div style={{marginTop:"1rem"}}>
               <input type="file" id="file_upload_input" className={styles.hidden_input} onChange={disPlayImage}/>
               <label htmlFor="file_upload_input" className={styles.custom_button}>Choose Image</label>
             </div>
             <div>
              <span id={styles.file_name} className={styles.selected_file_name}>Up load Course thumbnail</span>
             </div>

             {/* uploaded image down here */}
              {
                imageUrl && (
                  <div className={styles.imagePlaceHolder}>
                    <span id={styles.removeImage} onClick={removeImage}>X</span>
                    <figure>
                      <img src={imageUrl} alt=""  />
                    </figure>
                  </div>
                )
              }
          </div>
        </div>


          <div className={styles.objectiveInfo}>
            <div>
              <label htmlFor="objectivies">What You`ll Learn</label><br />
              {
                objectives.map((objective, i)=>(              
                   <div key={i}>
                      <input type="text" name="objectivies" id=""  placeholder={`Learning placeholder ${1+i}`}
                      value={objective} onChange={(e)=>placeValueInObjective(e, i)}              />
                      {   i>2 &&   <span onClick={removeObjective}>x</span>     }                        
                   </div>                       
                ))             
              }
              <br />
              <button onClick={addNewObjective}>+ Add more objectives</button>
            </div> 
          </div>


          <div className={styles.requirementInfo}>
            <div>
              <label htmlFor="objectivies">Requirements</label><br />
              {
                requirements.map((requirement, i)=>(
                 <div key={i}>
                  <input type="text" name="objectivies" id=""  placeholder="Requirements"
                  value={requirement} onChange={(e)=>placeValueInRequirements(e, i)} 
                   />
                  {   i>1 &&   <span onClick={removeRequirements}>x</span>     }            
                </div>
                ))              
              }
              <br />
              <button onClick={addNewRequirements}>+ Add more Requirements</button>
            </div>  
          </div>

        </div>
      </div>

    <div className={styles.lastSection}>
       <hr />
       <div className={styles.btnSection}>
        <button onClick={saveDraft}>Save as Draft</button>  
        {/* use useReducer + context API here */}
        <button onClick={sendForm}>Create Course</button>
       </div>
    </div>

    </div>
  );
};

export default AddCourse;

"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/videoUpload.module.css";
import { LuVideo } from "react-icons/lu";

interface videoUploadPros {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | null>>;

  progress: number,
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  uploading: boolean,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>;

}

const VideoUpload = ({ selectedFile, setSelectedFile, progress, setProgress, uploading, setUploading} 
  : videoUploadPros) => {

  let [videoURL, SetvideoURL] = useState<string | null>(null);


  useEffect(()=>{
    if(selectedFile === null){
      SetvideoURL(null);
      setUploading(false);
    }
  }, [selectedFile]);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      //vdieo URL
      SetvideoURL(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeVideo = () => {
    SetvideoURL(null);
    setSelectedFile(null);
  };



  return (
    <>
      <div className={styles.videoUploadContainer}>
        <h4>Upload Course Content</h4>
        <div className={styles.videoBOX}>
          <div className={styles.labelDIV}>
            <div>
              <LuVideo />
            </div>
            <label htmlFor="videoUpload">Upload Video</label>
          </div>
          {videoURL && (
            <div className={styles.videoShowContainer}>
              <video
                id="videoPlayer"
                controls
                style={{ width: "100%", height: "auto" }}
              >
                <source src={videoURL} type="video/mp4" />
              </video>
              <span id={styles.removeVideo} onClick={removeVideo}>
                x
              </span>
            </div>
          )}
          <input
            type="file"
            name=""
            id="videoUpload"
            accept="video/*"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <p
              style={{ textAlign: "center", marginTop: "5rem", color: "#333" }}
            >
              Selected file: {selectedFile.name}
            </p>
          )}


          {uploading && <span className={styles.uploadingDIV}>Uploading</span>}

          {uploading && (
            <div className={styles.progressDIV}>
              <p>Uploading: {progress}%</p>
              <progress
                value={progress}
                max="100"
                // id={styles.progressBar}
              ></progress>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoUpload;





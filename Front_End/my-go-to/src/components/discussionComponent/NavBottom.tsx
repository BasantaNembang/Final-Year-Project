import React from "react";
import styles from "../../styles/navBottom.module.css";

interface navBottomProps {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>,
  currentPageSize: number
}

const NavBottom = ({ page, setPage, currentPageSize }: navBottomProps) => {

  const nextData = () => {
    if(currentPageSize == 3 ){
      setPage((prev) => prev + 1);
    }
  };

  const prevData = () =>{
    if(page > 0){
      setPage((prev) => prev - 1);
    }
  }


  return (
    <>
      <div className={styles.navBoomContainer}>
        <button id={styles.prev} onClick={prevData}>Previous</button>
        <button id={styles.next} onClick={nextData}> Next </button>
      </div>
    </>
  );
};

export default NavBottom;

import React from "react";
import styles from "../styles/filterModal.module.css";

interface filterModalProps {
  Setflag: React.Dispatch<React.SetStateAction<Boolean>>;
}

const FilterModal = ({ Setflag }: filterModalProps) => {
  return (
    <>
      <div
        className={styles.editModal_wrapper}
        onClick={() => Setflag((prev) => !prev)}
      >
        <div className={styles.editModal_conatiner}>
          <div  className={styles.categorySection}>
            <p>Category</p>
            <button>All Categories</button>
            <button>BUSINESS</button>
            <button>IT</button>
            <button>MEDICINE</button>
            <button>DESIGN</button>
            <button>MARKETING</button>
            <button>MUSIC</button>
            <button>PHOTO</button>
          </div>
          <div className={styles.categorySection}>
            <p>Level</p>
            <button>All Level</button>
            <button>EASY</button>
            <button>MEDUIM</button>
            <button>HARD</button>
          </div>
          <div className={styles.categorySection}>
            <p>Price</p>
            <button>All Price</button>
            <button>FREE</button>
            <button>Below 1000</button>
            <button>Between 1000 & 50000</button>
            <button>Above 50000</button>
          </div>
          <div className={styles.btnSection}>
            <button>CANCEL</button>
            <button>DONE</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;

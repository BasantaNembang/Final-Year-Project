import React from 'react'
import style from '../../styles/instructor.module.css'


const InstructorInfo = () => {
  return (
    <div className={style.instructorContainer}>
      <h3>Your Instructor</h3>
      <div className={style.instuctorBOX}>
        <div className={style.imageSectoin}>
         <figure>
          <img src="https://www.kaashivinfotech.com/wp-content/uploads/2024/10/fs-java.png" alt="" />
         </figure>
        </div>
        <div className={style.informationSection}>
          <span >Basanta Nembang</span>
          <span>Software Enginner</span>
          <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem at placeat vitae totam, accusantium dolor dolorum ducimus molestiae, doloremque tempore ipsa? Minima cupiditate eos qui similique, numquam adipisci in. Natus distinctio error commodi.</span>
        </div>
      </div>
    </div>
  )
}

export default InstructorInfo

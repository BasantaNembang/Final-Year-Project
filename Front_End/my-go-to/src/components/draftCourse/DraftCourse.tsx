import React, { useState } from "react";
import styles from "../../styles/draftCourse.module.css";
import DraftCourseItem from "../draftCourseItem/DraftCourseItem";
import EditCourse from "../editCourse/EditCourse";
import { DarftContextDataType } from "@/types/draftContext";

const DraftCourse = () => {
  const [draftCourse, SetDraftCourse] = useState<DarftContextDataType | null>(
    null
  );
  const [courseIndex, SetCourseIndex] = useState<number>(0);

  return (
    <>
      <div className={styles.draftCourseContainer}>
        {draftCourse === null ? (
          //  list of draft courses
          <DraftCourseItem SetDraftCourse={SetDraftCourse} SetCourseIndex={SetCourseIndex}/>
        ) : (
          // each courses
          <EditCourse draftCourse={draftCourse} SetDraftCourse={SetDraftCourse}  courseIndex={courseIndex}/>
        )}
      </div>
    </>
  );
};

export default DraftCourse;

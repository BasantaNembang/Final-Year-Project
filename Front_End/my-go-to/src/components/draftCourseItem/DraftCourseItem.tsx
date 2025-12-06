"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/draftCourseItem.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDraftContexHook } from "@/context/DraftContext";
import { DarftContextDataType } from "@/types/draftContext";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

interface draftProps {
  //SetFlag: React.Dispatch<React.SetStateAction<boolean>>;
  //draftCoourse: DarftContextDataType;
  SetDraftCourse: React.Dispatch<React.SetStateAction<DarftContextDataType | null>>
  SetCourseIndex: React.Dispatch<React.SetStateAction<number>>
}

const DraftCourseItem = ({  SetDraftCourse, SetCourseIndex  }: draftProps) => {
  const [draftCourseList, SetDraftCourseList] = useState<DarftContextDataType[] | null>(
    null
  );

  const { state, dispatch } = useDraftContexHook();

  useEffect(() => {
    SetDraftCourseList(state.slice(1));
  }, [state]);

  const showContinueEditiing = (each : DarftContextDataType, i:number) => {
    SetDraftCourse(each)
    SetCourseIndex(i)
  };

  const deleteDraftItem = (  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,   i: number  ) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success mx-2",
        cancelButton: "btn btn-danger mx-2",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch({ type: "deleteDraftData", payload: i });
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <>
      {state.length > 1 ? (
        draftCourseList?.map((each, i) => (
          <div className={styles.draftCourseItem} key={i}>
            <div className={styles.imageSection}>
              <figure>
                {each.image && (
                  <img src={URL.createObjectURL(each.image)} alt="" />
                )}
                <span>DRAFT</span>
              </figure>
            </div>
            <div className={styles.heading}>
              <h4>{each.title}</h4>
            </div>
            <div className={styles.edited}>
              <p>Last Edidted: 5 mins ago</p>
            </div>
            <hr id={styles.LINE} />
            <div className={styles.btn}>
              <div>
                <button
                  className={styles.continue_editingBTN}
                  onClick={()=>showContinueEditiing(each, i)}
                >
                  Continue Editing
                </button>
              </div>
              <div>
                <span>Delete</span>
                <button
                  className={styles.delete_BTN}
                  onClick={(e) => deleteDraftItem(e, i)}
                >
                  <RiDeleteBinLine />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>Empty Course Draft</div>
      )}
    </>
  );
};

export default DraftCourseItem;

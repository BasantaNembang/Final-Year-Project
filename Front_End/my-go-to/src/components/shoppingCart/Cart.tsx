import React from 'react'
import styles from '../../styles/shoppingCard.module.css'
import { useRouter } from "next/navigation";
import { CartData } from '@/types/cartData';
import { deleteCartItem } from '@/lib/Helper-Two';


interface cartProps{
    each: CartData,
    setRemoveItemIndex: React.Dispatch<React.SetStateAction<number | undefined>>,
    index: number
}

const Cart = ({each, setRemoveItemIndex, index}: cartProps) => {

    if(!each) return <><span>Loading.......</span></>;

    const router =  useRouter();
    //var CryptoJS = require("crypto-js");

    //const secretKEY = process.env.NEXT_PUBLIC_MY_SECRECT_KEY;

   
    const goToPayment = () =>{
       //var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(each.courseId), secretKEY).toString();
       router.push("/payment?courseId=" + each.courseId);
    }
    
    const deleteFromDB = (id: string) =>{
        deleteCartItem(id);
    }
    

    const removeCartItem = () =>{
        deleteFromDB(each.cartId);
        setRemoveItemIndex(index)
    }


    return (
        <div>
            <div className={styles.cardConatainer}>
                <div className={styles.cardConatainer_MetaData}>
                    <div> <figure> <img src={each.imageUrl} alt="java1212" /> </figure> </div>
                    <div className={styles.cardConatainer_MetaData_CourseValue}>
                        <p className={styles.cartHeader}>{each.courseName}</p>
                        <p className={styles.cartAuthor}>by {each.teacherName}</p>
                        <p style={{ color: "#928b8b" }}>{each.duration} hrs</p>
                    </div>
                </div>
                <div className={styles.cardConatainer_CheckOut}>
                    <div className={styles.cardConatainer_CheckOut_PriceValue}>
                        <p>Rs: {each.price}</p>
                        <p><del>Rs: {each.price+1000}</del></p>
                    </div>
                    <div className={styles.cardConatainer_CheckOut_BTN}>
                        <button onClick={goToPayment}>CheckOutNow</button>
                        <button onClick={removeCartItem}>Remove</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;


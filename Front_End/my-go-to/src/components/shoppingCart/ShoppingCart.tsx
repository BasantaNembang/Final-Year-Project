"use client";

import React, { useEffect, useState } from "react";
import styles from '../../styles/shoppingCard.module.css'
import Cart from './Cart'
import { CartData } from "@/types/cartData";
import { getCartItems } from "@/lib/Helper-Two";


interface shoppingCardPorps {
    currentUserId: string
}


const ShoppingCart = ({ currentUserId }: shoppingCardPorps) => {

    const [cartDataList, setCartDataList] = useState<CartData[] | []>([]);
    const [removeItemIndex, setRemoveItemIndex] = useState<number | undefined>(0);

    const getTheCartData = async () => {
        const data = await getCartItems(currentUserId);
        setCartDataList(data.enrollData)
    }

    useEffect(() => {
      getTheCartData()
    }, [currentUserId]);


    const setTheCartITEM = () =>{
       if(removeItemIndex === undefined) return;
       const data = cartDataList.filter((_, i)=> i!==removeItemIndex )
       setCartDataList(data);
       setRemoveItemIndex(undefined)
    }


    useEffect(() => {
      setTheCartITEM();
    }, [removeItemIndex])


    return (
        <>
            <div className={styles.shoppingCardContainer}>
                {
                    cartDataList.map((each, i) => (
                        <Cart each={each} setRemoveItemIndex={setRemoveItemIndex} index={i} key={i} />
                    ))
                }
            </div>
        </>
    )
}

export default ShoppingCart


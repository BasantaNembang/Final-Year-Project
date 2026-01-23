"use client";

import React, { useState, useEffect, use } from "react";
import styles from "../../styles/navbar.module.css";
import { PiGraduationCapLight } from "react-icons/pi";
import Link from "next/link";
import { IoReorderThreeOutline } from "react-icons/io5";
import { motion, AnimatePresence,  Variants } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useHelperContexHook } from "@/context/helperContext";
import { toast } from "react-toastify";


const Navbar = () => {
  
  const router = useRouter()
  const [isOpen, SetIsOpen] = useState(false);
  const [isLogged, SetIsLogged] = useState<Boolean>(false);

  const {isPrivate, setIsPrivate}  = useHelperContexHook();


  const pathName = usePathname();


  const checkLogIN = async() =>{
    const isLoggedIN = await axios.get('/api/auth/check',  { withCredentials: true } );
    SetIsLogged(isLoggedIN.data.isLoggedIn)
  }


  useEffect(()=>{
    SetIsOpen(false)
    checkLogIN()
  }, [pathName]);


   useEffect(()=>{
     if(isOpen){
      document.body.style.overflow = 'hidden';
     }else{
      document.body.style.overflow = 'auto';
     }    
   }, [isOpen]);
   

  const backToHomePage = () =>{
      SetIsOpen(false)
      router.push("/")
  }


  const showMobileMenu =() =>{
    SetIsOpen((prev)=>!prev);
  }

   const menuVariants: Variants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
        when:"beforeChildren",  //comes before child
        staggerChildren: 0.15,  // comes one by one -child,,,,
      },
    },
    exit: { x: "-100%",
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.37 },
    },
  };


  const logOutAccount = async() =>{
    try {
     await axios.post('/api/auth/logout')
       toast.success("logout successfully")
    } catch (error) {
      toast.error("logout fail")
    }
  }


  //logOut
  const logOUT = () =>{
    if(isLogged && isLogged === true){
        logOutAccount();}
  }


  return (
    <>
      <div className={styles.navbarContainer} >

        <div className={`${styles.leftNavbar}`} style={{position: isOpen ? 'absolute' : 'static'}}>
          <PiGraduationCapLight id={styles.logo}/>
          <span>MyGoTO</span>
        </div>
        {/* for mobile screen */}
        <AnimatePresence>
        {
          isOpen &&
              <motion.div  className={`${styles.rightNavbar}  ${styles.showMenu}`} 
               variants={menuVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
              >
                <ul>
                  <motion.li variants={itemVariants} onClick={backToHomePage}><Link href="#">Home</Link></motion.li>
                  <motion.li variants={itemVariants}><Link href="/course">Courses</Link></motion.li>
                  <motion.li variants={itemVariants}><Link  href="/teaching">Teach on MyGoTo</Link></motion.li>
                  {/* <motion.li variants={itemVariants} ><Link href="#">My learning</Link></motion.li> */}
                  <motion.li variants={itemVariants}><Link href="#"><button>LogIn</button></Link></motion.li>
                  <motion.li variants={itemVariants}><Link href="#"><span></span></Link></motion.li>
                </ul>

                {/* <div className={styles.crossSection}>
                  x
                </div> */}
              </motion.div>
        }
        </AnimatePresence>
          {/* for normal screen  */}
          {
          !isOpen &&
           <div  className={`${styles.rightNavbar} !isOpen? ${styles.removeNav} :  " "`}    >
                <ul>
                  <li className={isPrivate ? styles.privateNavBar : ' '}><Link href="/" className={pathName==="/" ? styles.blue : ""}>Home</Link></li>
                  <li className={isPrivate ? styles.privateNavBar : ' '}><Link href="/course" className={pathName==="/course" ? styles.blue : ""}>Courses</Link></li>
                  <li className={isPrivate ? styles.privateNavBar : ' '}><Link href = { isLogged ? "/upload" : "/teaching" } className={pathName==="/teaching" ? styles.blue : ""}>Teach on MyGoTo</Link></li>
                  <li className={isPrivate ? styles.privateNavBar : ' '}><Link href="/learnings" className={pathName==="/learnings" ? styles.blue : ""}>My learning</Link></li> 
                  <li className={isPrivate ? styles.privateNavBar : ' '}><Link href="/auth"><button onClick={logOUT}>{isLogged? 'LogOut' : 'LogIn' }   </button></Link></li>
                  <li style={{marginLeft: isPrivate ? '92%' : ''}}><Link href="#"><span></span></Link></li>
                </ul>
              </div>
          }

         <div id={styles.burgerIcon}>
           {
            !isOpen ? ( <IoReorderThreeOutline  onClick={showMobileMenu}  /> ):
            ( <RxCross2 onClick={showMobileMenu} id={styles.crossSecction}/> )
           }
          </div>
      </div>

    </>
  );
};

export default Navbar;

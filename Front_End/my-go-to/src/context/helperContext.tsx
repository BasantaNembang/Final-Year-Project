"use client";

import { getUserNameByID } from "@/lib/Auth-Service";
import { EnrollmentResponse } from "@/types/enrollmentData";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface HelperContexDTO {
  //to hide the navbar
  isPrivate: boolean;
  setIsPrivate: React.Dispatch<React.SetStateAction<boolean>>;
  //to store the teacherID
  data: string;
  setData: React.Dispatch<React.SetStateAction<string>>;
  //stream video
  streamData: EnrollmentResponse | null,
  setStreamData: React.Dispatch<React.SetStateAction<EnrollmentResponse | null>>;
  //for messages
  messageId: string[];
  setMessageId: React.Dispatch<React.SetStateAction<string[] | []>>;
  //for messages
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;  
  //for cuurentUser
  cuurentUser: string;
  setcuurentUser: React.Dispatch<React.SetStateAction<string>>;
  //for dm messages connection 
  dmConnected: boolean;
  setDmConnected: React.Dispatch<React.SetStateAction<boolean>>;  
}

export const HelperContext = createContext<HelperContexDTO | undefined>(
  undefined
);

type ChildrenProviderProps = {
  children: ReactNode;
};

export function PrivateContextProvider({ children }: ChildrenProviderProps) {
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [data, setData] = useState<string>("");
  const [streamData, setStreamData] = useState<EnrollmentResponse | null>(null);
  const [messageId, setMessageId] = useState<string[] | []>([]);
  const [connected, setConnected] = useState<boolean>(false);
  const [dmConnected, setDmConnected] = useState<boolean>(false);

  //new added
  const [cuurentUser, setcuurentUser] = useState<string>("");



  useEffect(()=>{
    const getTheCuurentUserName = async() =>{
     if(!streamData) return;
     const data = await getUserNameByID(streamData?.userId)
     setcuurentUser(data)
    }

    getTheCuurentUserName()
  }, [streamData]);



  return (
    <HelperContext.Provider value={{ isPrivate, setIsPrivate, data, setData, streamData, setStreamData,
      messageId, setMessageId, connected, setConnected, cuurentUser, setcuurentUser, dmConnected, setDmConnected }}>
      {children}
    </HelperContext.Provider>
  );
}


export function useHelperContexHook() {
  const context = useContext(HelperContext);
  if (!context) {
    throw new Error("Auth Provider is not provided..........");
  }
  return context;
}

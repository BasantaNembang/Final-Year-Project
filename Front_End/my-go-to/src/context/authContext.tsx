"use client";

import { authData } from "@/types/authData";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { isJwtExpired } from "jwt-check-expiration";
import { getTokenViaRereshToken } from "@/api/Auth-Service";

export const AuthContext = createContext<authData | undefined>(undefined);

type ChildrenProviderProps = {
  children: ReactNode;
};

export function AuthContextProvider({ children }: ChildrenProviderProps) {
  const [jwtToken, SetjwtToken] = useState<string | null>(null);
  const [refreshToken, SetrefreshToken] = useState<string | null>(null);
  const [role, Setrole] = useState<string | null>(null);
 

  const handelExpiredToken = async(token: string, refreshToken:string) =>{
      let flag = isJwtExpired(token);
      if(flag ===  true){
        //token is expired and call the refresh Token
        const response = await getTokenViaRereshToken(refreshToken);
        if(response?.status === 500 && response.data.msg === "Token expired"){
            console.log("Please Lon in---------------------------")
            localStorage.clear()
        }else{
        localStorage.setItem("jwtToken", response?.data?.jwtToken)
        }

    }
  }



  useEffect(()=>{

    const token = localStorage.getItem("jwtToken")
    const refreshtoken = localStorage.getItem("refreshToken")
    const role = localStorage.getItem("role")
    SetjwtToken(token)
    SetrefreshToken(refreshtoken)
    SetrefreshToken(role)

    if(token!==null && refreshtoken!==null){
     handelExpiredToken(token, refreshtoken);
    }

  }, [jwtToken, refreshToken]);


  
  const saveToken = (jwt: string, refreshToken: string, role: string) => {
    localStorage.setItem("jwtToken", jwt);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("role", role);

    SetjwtToken(jwt);
    SetrefreshToken(refreshToken);
    Setrole(role);
  };

  const removeToken = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");

    SetjwtToken(null);
    SetrefreshToken(null);
    Setrole(null);
  };



  const data: authData = {
    saveToken,
    removeToken,
    jwtToken,
    refreshToken,
    role
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export function useAuthContexHook() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth Provider is not provided..........");
  }
  return context;
}

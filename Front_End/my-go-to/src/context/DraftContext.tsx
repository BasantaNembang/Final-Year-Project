"use client";

import { DraftContextType } from "@/types/draftContext";
import { createContext, ReactNode, useContext, useReducer } from "react";
import { reducer, initialState } from "../reducers/DraftReducerFun";

export const DraftContext = createContext<DraftContextType | undefined>(
  undefined
);

type ChildrenProviderProps = {
  children: ReactNode;
};

export function DraftContextProvider({ children }: ChildrenProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DraftContext.Provider value={{ state, dispatch }}>
      {children}
    </DraftContext.Provider>
  );
}

export function useDraftContexHook() {
  const context = useContext(DraftContext);
  if (!context) {
    throw new Error("Error in Draft-Context");
  }
  return context;
}

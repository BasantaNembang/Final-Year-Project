
export interface DarftContextDataType {
  //each: string;
  course_id: string,
  author: string,
  title: string,
  description: string,
  level: string,
  time: number,
  thumbnail_url: string,
  create_at: Date | null,
  stream_id: string,
  price: number,
  category: string,
  objectives: string[],
  requirements: string[],
  video: File | null,
  image: File | null,
}


export type DraftContexAction =
  | { type: "draftData", payload: DarftContextDataType }
  | { type: "deleteDraftData", payload: number }
  | { type: "updateTitle", payload: { title: string, index: number } }
  | { type: "updateDescription", payload: { title: string, index: number } }
  | { type: "updateCategory", payload: { title: string[], index: number } }
  | { type: "updateThumanilURL", payload: { title: File, index: number } }
  | { type: "updateObjective", payload: { title: string[], index: number } }
  | { type: "updateRequirements", payload: { title: string[], index: number } }



export interface DraftContextType {
  state: DarftContextDataType[],
  dispatch: React.Dispatch<DraftContexAction>,
}



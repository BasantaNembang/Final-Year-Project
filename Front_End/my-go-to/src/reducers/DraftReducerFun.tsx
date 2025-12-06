import { DarftContextDataType, DraftContexAction } from "@/types/draftContext";

export const initialState: DarftContextDataType[] = [
  {
    course_id: "",
    author: "",
    title: "",
    description: "",
    level: "",
    time: 0,
    thumbnail_url: "",
    create_at: null,
    stream_id: "",
    price: 0,
    category: "",
    objectives: [],
    requirements: [],
    video: null,
    image: null,
  },
];

export const reducer = ( state: DarftContextDataType[],  action: DraftContexAction): DarftContextDataType[] => {

  switch (action.type) {
    case "draftData":
      return [...state, action.payload];

    case "deleteDraftData":
      const oldData = [...state];
      const index = action.payload + 1;
      const filteredData = oldData.filter((_, i) => i !== index);
      return filteredData;

    case "updateTitle":
      const oldData0 = [...state];
      oldData0.slice(1).forEach((each, i) => {
        if (action.payload.index === i) {
          each.title = action.payload.title;
        }
      });
      return oldData0;

    case "updateDescription":
      const oldData1 = [...state];
      oldData1.slice(1).forEach((each, i) => {
        if (action.payload.index === i) {
          each.description = action.payload.title;
        }
      });
      return oldData1;

    case "updateCategory":
      const oldData2 = [...state];
      oldData2.slice(1).forEach((each, i) => {
        if (action.payload.index === i) {
          each.price = Number(action.payload.title[0])
          each.level = action.payload.title[1]
          each.time = Number(action.payload.title[2])
          each.category = action.payload.title[3]
        }
      });
      return oldData2;      

    case "updateThumanilURL":
      const oldData3 = [...state];
      oldData3.slice(1).forEach((each, i) => {
        if (action.payload.index === i) {
          each.image = action.payload.title
        }
      });
      return oldData3;      

    case "updateObjective":
      const oldData4 = [...state];
      oldData4.slice(1).forEach((each, i) => {
        if (action.payload.index === i) {
            each.objectives = each.objectives.map((oldOBJ, j)=>(oldOBJ = action.payload.title[j]))
        }
      });
      return oldData4;     

    case "updateRequirements":
      const oldData5 = [...state];
      oldData5.slice(1).forEach((each, i) => {
        if (action.payload.index === i) {
            each.requirements = each.requirements.map((oldORE, j)=>(oldORE = action.payload.title[j]))
        }
      });
      return oldData5;     

    default:
      throw Error("Some thing went wrong in reducer function");
  }
};


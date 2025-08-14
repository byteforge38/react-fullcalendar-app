import { v4 as uuidv4 } from "uuid";
import { Event, PostEventRequest } from "../types/event.type";

export const generateEvent = (eventParams: PostEventRequest): Event => {
  return {
    id: uuidv4(),
    ...eventParams,
  };
};

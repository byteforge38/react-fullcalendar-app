import API from "../constants/frontend/api";
import { PatchEventRequest, PostEventRequest } from "../types/event.type";

const getEvents = async () => {
  const response = await fetch(API.GET_EVENTS());
  const data = await response.json();
  return data;
};

const postEvent = async (event: PostEventRequest) => {
  const response = await fetch(API.POST_EVENT(), {
    method: "POST",
    body: JSON.stringify(event),
  });
  const data = await response.json();
  return data;
};

const patchEvent = async (event: PatchEventRequest) => {
  const response = await fetch(API.PATCH_EVENT(event.id), {
    method: "PATCH",
    body: JSON.stringify(event),
  });
  const data = await response.json();
  return data;
};

const deleteEvent = async (id: string) => {
  const response = await fetch(API.DELETE_EVENT(id), {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
};

const EventAPI = { getEvents, postEvent, patchEvent, deleteEvent };

export default EventAPI;

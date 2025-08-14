import { STORAGE_KEY } from "../constants/mock/storage";
import type { Event } from "../types/event.type";

const getEvents = (): Event[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

const saveEvents = (events: Event[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
};

const addEvent = (event: Event): void => {
  const events = getEvents();
  events.push(event);
  saveEvents(events);
};

const updateEvent = (event: Event): Event => {
  const events = getEvents();
  const eventIdx = events.findIndex((e) => e.id === event.id);
  events[eventIdx] = event;
  saveEvents(events);
  return event;
};

const removeEvent = (eventId: string): void => {
  const events = getEvents();
  const eventIdx = events.findIndex((e) => e.id === eventId);
  events.splice(eventIdx, 1);
  saveEvents(events);
};

const getEventById = (eventId: string): Event | undefined => {
  const events = getEvents();
  return events.find((e) => e.id === eventId);
};

const Storage = {
  getEvents,
  saveEvents,
  addEvent,
  updateEvent,
  removeEvent,
  getEventById,
};

export default Storage;

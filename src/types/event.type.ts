import { EventInput } from "@fullcalendar/core";

export type Event = EventInput;
export type PostEventRequest = Omit<Event, "id">;
export type PatchEventRequest = Partial<PostEventRequest>;

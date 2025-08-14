import { delay, http, HttpResponse } from "msw";
import API from "../constants/mock/routes";
import type { PatchEventRequest, PostEventRequest } from "../types/event.type";
import { generateEvent } from "./helpers";
import Storage from "./storage";

// Mock data in memory

export const handlers = [
  // Get all events
  http.get(API.GET_EVENTS, async () => {
    await delay(2000);
    const events = Storage.getEvents();
    return HttpResponse.json(events);
  }),

  // Get a single event by id
  http.get(API.GET_EVENT, async ({ params }) => {
    const { id } = params;

    // Find the event by id
    const event = Storage.getEventById(id as string);

    if (!event) {
      return HttpResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await delay(1000);

    // Return the event
    return HttpResponse.json(event);
  }),

  // Create a new event
  http.post(API.POST_EVENT, async ({ request }) => {
    const body = (await request.json()) as PostEventRequest;

    // Generate a new event from params
    const event = generateEvent(body);
    Storage.addEvent(event);

    await delay(1000);

    // Return the new event with id
    return HttpResponse.json(event);
  }),

  // Update an existing event
  http.patch(API.PATCH_EVENT, async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as PatchEventRequest;

    // Find the event by id
    const event = Storage.getEventById(id as string);
    if (!event) {
      return HttpResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await delay(1000);

    // Update the event with the new values
    const updatedEvent = Storage.updateEvent({
      ...event,
      ...body,
    });

    // Return the updated event
    return HttpResponse.json(updatedEvent);
  }),

  // Delete an existing event
  http.delete(API.DELETE_EVENT, async ({ params }) => {
    const { id } = params;

    // Find the event by id
    const event = Storage.getEventById(id as string);
    if (!event) {
      return HttpResponse.json({ error: "Event not found" }, { status: 404 });
    }

    await delay(1000);

    // Remove the event from the array
    Storage.removeEvent(id as string);

    // Return the id of the deleted event
    return HttpResponse.json({ id });
  }),
];

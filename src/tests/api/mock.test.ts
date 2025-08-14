import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { handlers } from "../../mocks/handlers";

import EventAPI from "../../api/events";

// Setup MSW server
const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close server after all tests
afterAll(() => server.close());

describe("API Client", () => {
  test("should fetch events successfully", async () => {
    const events = await EventAPI.getEvents();
    expect(events).toBeDefined();
  });

  test("should create event successfully", async () => {
    const event = await EventAPI.postEvent({
      title: "Test Event",
      start: new Date(),
      end: new Date(),
    });

    expect(event).toBeDefined();
    expect(event.title).toBe("Test Event");
    expect(event.start).toBeDefined();
    expect(event.end).toBeDefined();
  });
});

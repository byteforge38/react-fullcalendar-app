import dayjs from "dayjs";
import { describe, expect, test } from "vitest";
import {
  getDateFromTimeString,
  getDateString,
  getTimeString,
} from "../../utils/date";

describe("getDateString", () => {
  test("Formats a valid Date object to locale date string", () => {
    const date = new Date("2025-05-01T15:20:00Z");
    const result = getDateString(date);
    expect(result).toBe("Thu, May 1, 2025");
  });

  test("Incorrect Date format returns 'Incorrect Date'", () => {
    expect(getDateString(undefined)).toBe("Incorrect Date");
  });

  test("Formats a valid Date object to locale time string", () => {
    const date = new Date();
    const result = getTimeString(date);
    expect(result).toBe(dayjs(date).format("HH:mm"));
  });

  test("Incorrect Date format returns 'Incorrect Date'", () => {
    expect(getTimeString(undefined)).toBe("Incorrect Date");
  });

  test("Convert time string to date", () => {
    const day = dayjs();
    const time = day.format("HH:mm");
    const result = getDateFromTimeString(time, day.toDate());
    expect(result).toEqual(day.second(0).toDate());
  });
});

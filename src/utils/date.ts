import dayjs from "dayjs";

export const getDateString = (date: Date | undefined) => {
  if (!date) {
    return "Incorrect Date";
  }

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

export const getTimeString = (date: Date | undefined) => {
  if (!date) {
    return "Incorrect Date";
  }

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

export const getDateFromTimeString = (time: string, date: Date) => {
  const [hour, minute] = time.split(":");
  return dayjs(date)
    .hour(parseInt(hour))
    .minute(parseInt(minute))
    .second(0)
    .toDate();
};

import { EventClickArg, EventDropArg } from "@fullcalendar/core";
import { DateClickArg, EventResizeDoneArg } from "@fullcalendar/interaction";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EventAPI from "../api/events";
import ErrorCode from "../constants/frontend/errors";
import Logger from "../logger";
import { Event } from "../types/event.type";
import useLoading from "./useLoading";

const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [actionEvent, setActionEvent] = useState<Event | null>(null);

  const loading = {
    load: useLoading(),
    save: useLoading(),
    remove: useLoading(),
  };

  const loadEvents = async () => {
    loading.load.startLoading();
    const events = await EventAPI.getEvents();
    setEvents(events);
    loading.load.stopLoading();
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleSlotClick = (info: DateClickArg) => {
    Logger.info("Slot Clicked", { date: info.date });
    setActionEvent({
      id: "",
      title: "",
      start: info.date,
      end: dayjs(info.date).add(1, "hour").toDate(),
    });
  };

  const handleEventClick = (info: EventClickArg) => {
    Logger.info("Event Clicked", { id: info.event.id });

    setActionEvent({
      id: info.event.id,
      title: info.event.title,
      start: dayjs(info.event.start).toDate(),
      end: dayjs(info.event.end).toDate(),
    });
  };

  const handleAddEvent = async (event: Event) => {
    try {
      loading.save.startLoading();
      const newEvent = await EventAPI.postEvent({
        title: event.title,
        start: event.start,
        end: event.end,
      });

      setEvents([
        ...events,
        {
          id: newEvent.id,
          title: newEvent.title,
          start: newEvent.start,
          end: newEvent.end,
        },
      ]);
      loading.save.stopLoading();
    } catch (error) {
      loading.save.stopLoading();
      Logger.error(error as string);
      throw new Error(ErrorCode.CREATE_EVENT);
    }
  };

  const handleDropEvent = async (info: EventDropArg) => {
    try {
      loading.save.startLoading();
      const updatedEvent = await EventAPI.patchEvent({
        id: info.event.id,
        start: info.event.startStr,
        end: info.event.endStr,
      });

      setEvents((prevEvents) => {
        return prevEvents.map((ev) =>
          ev.id === updatedEvent.id ? updatedEvent : ev
        );
      });
      loading.save.stopLoading();
    } catch (error) {
      loading.save.stopLoading();
      Logger.error(error as string);
      info.revert();
      toast.error(`Error happend with code: ${ErrorCode.MOVE_EVENT}`);
    }
  };

  const handleResizeEvent = async (info: EventResizeDoneArg) => {
    try {
      loading.save.startLoading();
      const updatedEvent = await EventAPI.patchEvent({
        id: info.event.id,
        start: info.event.startStr,
        end: info.event.endStr,
      });

      setEvents((prevEvents) => {
        return prevEvents.map((event) =>
          event.id === updatedEvent.id ? updatedEvent : event
        );
      });
      loading.save.stopLoading();
    } catch (error) {
      loading.save.stopLoading();
      Logger.error(error as string);
      info.revert();
      toast.error(`Error happend with code: ${ErrorCode.RESIZE_EVENT}`);
    }
  };

  const handleUpdateEvent = async (event: Event) => {
    try {
      const updatedEvent = await EventAPI.patchEvent(event);
      loading.save.startLoading();
      setEvents((prevEvents) => {
        return prevEvents.map((ev) =>
          ev.id === updatedEvent.id ? updatedEvent : ev
        );
      });
      loading.save.stopLoading();
    } catch (error) {
      loading.save.stopLoading();
      Logger.error(error as string);
      throw new Error(ErrorCode.UPDATE_EVENT);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      loading.remove.startLoading();
      await EventAPI.deleteEvent(eventId);

      setEvents((prevEvents) => {
        return prevEvents.filter((ev) => ev.id !== eventId);
      });
      loading.remove.stopLoading();
    } catch (error) {
      loading.remove.stopLoading();
      Logger.error(error as string);
      throw new Error(ErrorCode.DELETE_EVENT);
    }
  };

  return {
    events,
    actionEvent,
    setActionEvent,
    handleSlotClick,
    handleEventClick,
    handleAddEvent,
    handleDropEvent,
    handleResizeEvent,
    handleDeleteEvent,
    handleUpdateEvent,
    isLoading: loading.load.loading,
    isSaving: loading.save.loading,
    isRemoving: loading.remove.loading,
  };
};

export default useEvents;

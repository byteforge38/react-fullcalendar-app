import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useRef, useState } from "react";

import EventContent from "../EventContent";
import Header from "../Header";

import { CalendarApi } from "@fullcalendar/core";
import useEvents from "../../hooks/useEvents";

import styles from "./Calendar.module.css";

const Calendar = (): React.JSX.Element => {
  const calendarRef = useRef<FullCalendar>(null);

  const [calendarApi, setCalendarApi] = useState<CalendarApi | undefined>(
    undefined
  );

  const {
    events,
    actionEvent,
    isLoading,
    isSaving,
    isRemoving,
    handleAddEvent,
    handleUpdateEvent,
    handleDropEvent,
    handleResizeEvent,
    handleDeleteEvent,
    handleSlotClick,
    handleEventClick,
  } = useEvents();

  useEffect(() => {
    setCalendarApi(calendarRef.current?.getApi());
  }, []);

  return (
    <div className={styles.container}>
      <Header
        isLoading={isLoading}
        isSaving={isSaving}
        isRemoving={isRemoving}
        actionEvent={actionEvent}
        calendarApi={calendarApi}
        handleAddEvent={handleAddEvent}
        handleUpdateEvent={handleUpdateEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
      <FullCalendar
        ref={calendarRef}
        initialView="timeGridDay"
        events={events}
        plugins={[timeGridPlugin, interactionPlugin]}
        editable={true}
        allDaySlot={false}
        dayHeaders={false}
        headerToolbar={false}
        slotDuration={"01:00:00"}
        contentHeight={"auto"}
        slotLabelFormat={{
          hour: "numeric",
          hour12: true,
        }}
        slotLabelClassNames={styles.slotLabelContainer}
        slotLaneClassNames={styles.slotLaneContainer}
        eventClassNames={styles.eventContainer}
        eventContent={(info) => (
          <EventContent
            eventInfo={info}
            selected={info.event.id === actionEvent?.id}
          />
        )}
        dateClick={handleSlotClick}
        eventClick={handleEventClick}
        eventDrop={handleDropEvent}
        eventResize={handleResizeEvent}
      />
    </div>
  );
};

Calendar.displayName = "Calendar";

export default Calendar;

import { CalendarApi } from "@fullcalendar/core/index.js";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "../Button";
import DayPickerButton from "../DayPickerButton";
import IconButton from "../IconButton";
import Editor from "../Editor";
import { Event } from "../../types/event.type";

import Logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import LoadingIcon from "../LoadingIcon";

enum NavigationDirection {
  PREV = "prev",
  NEXT = "next",
  TODAY = "today",
}

interface IHeaderProps {
  actionEvent: Event | null;
  isLoading: boolean;
  isSaving: boolean;
  isRemoving: boolean;
  calendarApi: CalendarApi | undefined;
  handleAddEvent: (event: Event) => Promise<void>;
  handleUpdateEvent: (event: Event) => Promise<void>;
  handleDeleteEvent: (eventId: string) => Promise<void>;
}

const Header = ({
  actionEvent,
  calendarApi,
  isLoading,
  isSaving,
  isRemoving,
  handleAddEvent,
  handleUpdateEvent,
  handleDeleteEvent,
}: IHeaderProps): React.JSX.Element => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setCurrentDate(calendarApi?.getDate());
  }, [calendarApi]);

  const handleNavigate = (direction: NavigationDirection) => {
    switch (direction) {
      case NavigationDirection.PREV:
        calendarApi?.prev();
        break;
      case NavigationDirection.NEXT:
        calendarApi?.next();
        break;
      case NavigationDirection.TODAY:
        calendarApi?.today();
        break;
    }

    setCurrentDate(calendarApi?.getDate());
  };

  const handleChangeDate = (date: Date) => {
    setCurrentDate(date);
    calendarApi?.gotoDate(date);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tools}>
        <img src={Logo} alt="Logo" />
        <DayPickerButton
          currentDate={currentDate}
          handleChangeDate={handleChangeDate}
        />
        <IconButton
          Icon={ChevronLeftIcon}
          handleClick={() => handleNavigate(NavigationDirection.PREV)}
        />
        <Button
          label="Today"
          rounded="full"
          handleClick={() => handleNavigate(NavigationDirection.TODAY)}
        />
        <IconButton
          Icon={ChevronRightIcon}
          handleClick={() => handleNavigate(NavigationDirection.NEXT)}
        />
        {isLoading && <LoadingIcon size={30} />}
      </div>
      <Editor
        event={actionEvent}
        isSaving={isSaving}
        isRemoving={isRemoving}
        currentDate={currentDate}
        handleAddEvent={handleAddEvent}
        handleUpdateEvent={handleUpdateEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
    </div>
  );
};

Header.displayName = "Header";

export default Header;

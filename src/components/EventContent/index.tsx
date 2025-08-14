import { EventContentArg } from "@fullcalendar/core";
import styles from "./EventContent.module.css";

import clsx from "classnames";

interface IEventContentProps {
  eventInfo: EventContentArg;
  selected: boolean;
}

const EventContent = ({
  eventInfo,
  selected,
}: IEventContentProps): React.JSX.Element => {
  return (
    <div
      className={clsx(styles.container, {
        [styles.selected]: selected,
      })}
    >
      <div className={styles.title}>{eventInfo.event.title}</div>
      <div className={styles.description}>
        {eventInfo.event.start?.toLocaleTimeString()} -{" "}
        {eventInfo.event.end?.toLocaleTimeString()}
      </div>
    </div>
  );
};

EventContent.displayName = "Event";

export default EventContent;

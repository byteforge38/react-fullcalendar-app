import { DayPicker as ReactDayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

import styles from "./DayPicker.module.css";

interface IDayPickerProps {
  currentDate: Date | undefined;
  handlePickDate: (date: Date) => void;
}

const DayPicker = ({ currentDate, handlePickDate }: IDayPickerProps) => {
  return (
    <ReactDayPicker
      animate
      required
      mode="single"
      classNames={{
        day: styles.day,
        chevron: styles.chevron,
        today: styles.today,
        selected: styles.selected,
      }}
      selected={currentDate}
      onSelect={handlePickDate}
    />
  );
};

DayPicker.displayName = "DayPicker";

export default DayPicker;

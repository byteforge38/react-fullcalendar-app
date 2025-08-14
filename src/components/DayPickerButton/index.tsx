import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { getDateString } from "../../utils/date";
import Button from "../Button";
import DayPicker from "../DayPicker";

import styles from "./DayPickerButton.module.css";

interface IDayPickerButtonProps {
  currentDate: Date | undefined;
  handleChangeDate: (date: Date) => void;
}

const DayPickerButton = ({
  currentDate,
  handleChangeDate,
}: IDayPickerButtonProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  const handlePickDate = (date: Date) => {
    handleChangeDate(date);
    setIsOpen(false);
  };

  return (
    <Popover
      isOpen={isOpen}
      padding={4}
      reposition={true}
      containerClassName={styles.popover}
      positions={["bottom", "left"]}
      align="start"
      content={
        <DayPicker currentDate={currentDate} handlePickDate={handlePickDate} />
      }
    >
      <div className={styles.container}>
        <Button
          fullWidth
          variant="text"
          label={getDateString(currentDate)}
          handleClick={() => setIsOpen((prev) => !prev)}
        />
      </div>
    </Popover>
  );
};

DayPickerButton.displayName = "DateSelector";

export default DayPickerButton;

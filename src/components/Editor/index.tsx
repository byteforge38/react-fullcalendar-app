import { useEffect, useRef, useState } from "react";
import { Event } from "../../types/event.type";
import Button from "../Button";
import Input from "../Input";
import styles from "./Editor.module.css";
import { getDateFromTimeString, getTimeString } from "../../utils/date";
import Logger from "../../logger";
import { toast } from "react-toastify";
import { SaveIcon, TrashIcon } from "lucide-react";
import LoadingIcon from "../LoadingIcon";

interface IEditorProps {
  event: Event | null;
  currentDate: Date | undefined;
  isSaving: boolean;
  isRemoving: boolean;
  handleAddEvent: (event: Event) => Promise<void>;
  handleUpdateEvent: (event: Event) => Promise<void>;
  handleDeleteEvent: (eventId: string) => Promise<void>;
}

const Editor = ({
  event,
  currentDate,
  isSaving,
  isRemoving,
  handleAddEvent,
  handleUpdateEvent,
  handleDeleteEvent,
}: IEditorProps): React.JSX.Element => {
  const titleRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);

  const [eventId, setEventId] = useState<string | undefined>(undefined);
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    Logger.info("Event Changed", event);
    if (event) {
      setEventId(event.id);
      setTitle(event.title as string);
      setStart(getTimeString(event.start as Date));
      setEnd(getTimeString(event.end as Date));
      titleRef.current?.focus();
    }
  }, [event]);

  const resetEditor = () => {
    setEventId(undefined);
    setTitle("");
    setStart("");
    setEnd("");
  };

  const validate = () => {
    if (!start || !end || !title) {
      toast.error("Please fill all the fields");
      return false;
    }

    if (
      getDateFromTimeString(start, currentDate as Date) >=
      getDateFromTimeString(end, currentDate as Date)
    ) {
      toast.error("Start time must be before end time");
      startTimeRef.current?.focus();
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validate()) {
      return;
    }

    if (eventId) {
      Logger.info("Update Event", { id: eventId, start, end, title });
      try {
        await handleUpdateEvent({
          id: eventId,
          title: title,
          start: getDateFromTimeString(start, currentDate as Date),
          end: getDateFromTimeString(end, currentDate as Date),
        });
        resetEditor();
      } catch (error) {
        toast.error(`${error}`);
      }
    } else {
      Logger.info("Create Event", { start, end, title });
      try {
        await handleAddEvent({
          title: title,
          start: getDateFromTimeString(start, currentDate as Date),
          end: getDateFromTimeString(end, currentDate as Date),
        });
        resetEditor();
      } catch (error) {
        toast.error(`${error}`);
      }
    }
  };

  const handleRemove = async () => {
    Logger.info("Remove Event", { id: event?.id });
    try {
      await handleDeleteEvent(event?.id as string);
      resetEditor();
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const isSaveDisabled = !start || !end || !title || isSaving || isRemoving;
  const isRemoveDisabled = !eventId || isSaving || isRemoving;

  return (
    <div className={styles.container}>
      <Input
        ref={startTimeRef}
        type="time"
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <Input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
      <Input
        ref={titleRef}
        type="text"
        value={title}
        placeholder="Event Title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <Button
        label="Save"
        color="success"
        startIcon={
          isSaving ? (
            <LoadingIcon size={24} />
          ) : (
            <SaveIcon size={24} strokeWidth={1} />
          )
        }
        disabled={isSaveDisabled}
        handleClick={handleSave}
      />
      <Button
        label="Remove"
        color="error"
        startIcon={
          isRemoving ? (
            <LoadingIcon size={24} />
          ) : (
            <TrashIcon size={24} strokeWidth={1} />
          )
        }
        disabled={isRemoveDisabled}
        handleClick={handleRemove}
      />
    </div>
  );
};

Editor.displayName = "Editor";

export default Editor;

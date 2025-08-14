import { LucideIcon } from "lucide-react";
import styles from "./IconButton.module.css";

interface IIconButtonProps {
  Icon: LucideIcon;
  handleClick: () => void;
}

const IconButton = ({
  Icon,
  handleClick,
}: IIconButtonProps): React.JSX.Element => {
  return (
    <button className={styles.container} onClick={handleClick}>
      <Icon size={16} />
    </button>
  );
};

IconButton.displayName = "IconButton";

export default IconButton;

import styles from "./LoadingIcon.module.css";

interface ILoadingIconProps {
  size?: number;
}

const LoadingIcon = ({ size = 30 }: ILoadingIconProps): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <div
        className={styles.spinner}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

LoadingIcon.displayName = "LoadingIcon";

export default LoadingIcon;

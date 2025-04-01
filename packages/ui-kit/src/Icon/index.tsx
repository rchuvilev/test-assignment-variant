import clsx from "clsx";
import styles from "./index.module.css";

type Props = {
  width?: number;
  height?: number;
  className?: string;
} & React.ComponentProps<"img">;

const Component = (props: Props) => {
  const { width, height, className, ...rest } = props;
  return (
    <img
      {...rest}
      className={clsx(className ?? "", styles.Icon)}
      width={width ?? 20}
      height={height ?? 20}
    />
  );
};

export { Component as Icon };

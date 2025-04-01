import clsx from "clsx";
import styles from "./index.module.css";
import { CSSProperties } from "react";

type Props = {
  iconUrl?: string;
  children: React.ReactNode;
  ref?: React.Ref<any>;
  disabled?: boolean;
} & React.ComponentProps<any>;

const Component = (props: Props) => {
  const { iconUrl } = props;
  const cleanProps = { ...props };
  delete cleanProps.iconUrl;
  return (
    <button
      {...cleanProps}
      className={clsx(
        styles.Button,
        { [styles.__icon]: !!iconUrl },
        props?.className ?? "",
      )}
      style={
        iconUrl
          ? ({ ["--icon-url"]: `url("${iconUrl}")` } as CSSProperties)
          : {}
      }
      disabled={props.disabled ?? false}
    >
      {props.children}
    </button>
  );
};

export { Component as Button };

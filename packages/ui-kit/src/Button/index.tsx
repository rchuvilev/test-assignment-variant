import style from "./index.module.css";
import clsx from "clsx";
import { CSSProperties } from "react";

type ButtonProps = {
  iconUrl?: string;
  children: React.ReactNode;
  ref?: React.Ref<any>;
} & React.ComponentProps<any>;

const Button = (props: ButtonProps) => {
  const { iconUrl } = props;
  const cleanProps = { ...props };
  delete cleanProps.iconUrl;
  return (
    <button
      {...cleanProps}
      className={clsx(
        style.Button,
        { [style.__icon]: !!iconUrl },
        props?.className ?? "",
      )}
      style={
        iconUrl
          ? ({ ["--icon-url"]: `url("${iconUrl}")` } as CSSProperties)
          : {}
      }
    >
      {props.children}
    </button>
  );
};

export { Button };

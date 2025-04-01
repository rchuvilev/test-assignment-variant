import { Button } from "ui-kit";
import styles from "./index.module.css";
import { TypographyText } from "../TypographyText";
import clsx from "clsx";
import { triggerPageViewChange } from "../../../features/PageView/usePageView.tsx";
import { CONST_TEXT_CTA_BUTTON_TEXT } from "../../../misc/consts.ts";
import { EPageViews } from "../../../features/PageView/pageView.model.ts";
import { useContext } from "react";
import { AppContext } from "../../../App.tsx";

type TProps = {
  mode?: "small" | "medium" | "fullwidth";
  handleClick?: Function;
  icon?: string;
  children?: React.ReactElement | string;
  color?: string;
  disabled?: boolean;
} & Partial<React.ComponentProps<any>>;

const Component = (props: TProps) => {
  const { doGotoNextApplication } = useContext(AppContext);
  const mode = props.mode ?? "medium";
  const isSmall = mode && mode === "small";
  const isFullwidth = mode === "fullwidth";
  const handleClickProp = props.handleClick;
  const handleClick = () => {
    handleClickProp && handleClickProp();
    !handleClickProp && triggerPageViewChange(EPageViews.FORM);
    !handleClickProp && doGotoNextApplication();
  };

  return (
    <Button
      className={clsx(
        styles.CtaButton,
        { [styles.__small]: isSmall },
        { [styles.__fullwidth]: isFullwidth },
      )}
      mode={props.mode ?? "small"}
      iconUrl={props.icon ?? "/test-assignment-variant/icons/plus.svg"}
      onClick={handleClick}
      disabled={props.disabled ?? false}
    >
      <TypographyText
        size={isSmall ? 16 : 18}
        color={props?.color ?? "var(--color-white)"}
        className={styles.CtaButton}
        {...props}
      >
        {props.children ?? CONST_TEXT_CTA_BUTTON_TEXT}
      </TypographyText>
    </Button>
  );
};

export { Component as CtaButton };

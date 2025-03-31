import clsx from "clsx";
import styles from "./index.module.css";
import { CSSProperties } from "react";
import { TypographyText } from "../TypographyText";
import {
  CONST_TEXT_CARD_ACTION_COPY,
  CONST_TEXT_CARD_ACTION_DELETE,
} from "../../../misc/consts.ts";

type TProps = {
  cardText: string;
  maxHeightPx?: number;
};

type TCardActionType = "copy" | "delete";

type TCardActionProps = {
  actionType: TCardActionType;
  cardText: string;
};

const CardAction = ({ actionType, cardText }: TCardActionProps) => {
  let iconUrl, name, handleClick;
  switch (actionType) {
    case "copy":
      iconUrl = "/icons/copy.svg";
      name = CONST_TEXT_CARD_ACTION_COPY;
      handleClick = () => navigator.clipboard.writeText(cardText);
      break;
    case "delete":
      iconUrl = "/icons/delete.svg";
      name = CONST_TEXT_CARD_ACTION_DELETE;
      handleClick = () => console.log("delete");
      break;
    default:
      return null;
      break;
  }
  return (
    <div onClick={handleClick} className={styles.CardAction}>
      <img
        className={styles.CardActionImage}
        src={iconUrl}
        alt={`${name} icon`}
      />
      <TypographyText
        className={styles.CardActionText}
        size={16}
        color="var(--color-gray-dark)"
      >
        {cardText}
      </TypographyText>
    </div>
  );
};

const Component = ({ cardText, maxHeightPx }: TProps) => {
  const isCropped = !!maxHeightPx;
  return (
    cardText && (
      <div
        className={clsx(styles.Card)}
        style={
          isCropped
            ? ({ [`--max-height`]: `${maxHeightPx}px` } as CSSProperties)
            : {}
        }
      >
        <div
          className={clsx(styles.Content, { [styles.__cropped]: isCropped })}
        >
          {cardText.split("\n").map((line: string) => (
            <p>
              <TypographyText size={18} color="var(--font-color-gray)">
                {line}
              </TypographyText>
            </p>
          ))}
        </div>
        {isCropped && (
          <div className={styles.Footer}>
            {(["copy", "delete"] as TCardActionType[]).map(
              (actionType: TCardActionType) => (
                <CardAction cardText={cardText} actionType={actionType} />
              ),
            )}
          </div>
        )}
      </div>
    )
  );
};

export { Component as Card };

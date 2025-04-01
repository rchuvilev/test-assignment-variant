import clsx from "clsx";
import styles from "./index.module.css";
import { CSSProperties, useContext } from "react";
import { TypographyText } from "../TypographyText";
import {
  CONST_TEXT_CARD_ACTION_COPY,
  CONST_TEXT_CARD_ACTION_DELETE,
} from "../../../misc/consts.ts";
import { utilComponentKey } from "../../../misc/utilComponentKey.ts";
import { AppContext } from "../../../App.tsx";

type TProps = {
  cardText: string;
  maxHeightPx?: number;
  passedIndex?: number;
  className?: string;
  ref?: any;
};

const Component = ({
  cardText,
  maxHeightPx,
  passedIndex,
  className,
  ref,
}: TProps) => {
  const isCropped = !!maxHeightPx;
  return (
    cardText && (
      <div
        className={clsx(styles.Card, className ?? "")}
        style={
          isCropped
            ? ({ [`--max-height`]: `${maxHeightPx}px` } as CSSProperties)
            : {}
        }
        data-index={(passedIndex ?? 0) + 1}
        ref={ref}
      >
        <div
          className={clsx(styles.Content, { [styles.__cropped]: isCropped })}
        >
          {cardText.split("\n").map((line: string, index: number) => (
            <p
              key={utilComponentKey(
                `${passedIndex ?? -1}-CardContentLine`,
                index,
              )}
            >
              <TypographyText size={18} color="var(--font-color-gray)">
                {line}
              </TypographyText>
            </p>
          ))}
        </div>
        {isCropped && (
          <div className={styles.Footer}>
            {(["copy", "delete"] as TCardActionType[])
              .reverse()
              .map((actionType: TCardActionType, index: number) => (
                <CardAction
                  key={utilComponentKey(
                    `${passedIndex ?? -1}-CardAction`,
                    index,
                  )}
                  cardText={cardText}
                  actionType={actionType}
                  cardIndex={passedIndex}
                />
              ))}
          </div>
        )}
      </div>
    )
  );
};

export { Component as Card };

type TCardActionType = "copy" | "delete";

type TCardActionProps = {
  actionType: TCardActionType;
  cardText: string;
  cardIndex?: number;
};

const CardAction = ({ actionType, cardText, cardIndex }: TCardActionProps) => {
  const { doRemoveApplication } = useContext(AppContext);
  let iconUrl, name, handleClick;
  switch (actionType) {
    case "copy":
      iconUrl = "./icons/copy.svg";
      name = CONST_TEXT_CARD_ACTION_COPY;
      handleClick = () => navigator.clipboard.writeText(cardText);
      break;
    case "delete":
      iconUrl = "./icons/delete.svg";
      name = CONST_TEXT_CARD_ACTION_DELETE;
      handleClick = () =>
        cardIndex !== undefined && doRemoveApplication(cardIndex);
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
        {name}
      </TypographyText>
    </div>
  );
};

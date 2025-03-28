import {Button} from "ui-kit";
import styles from './index.module.css';
import {TypographyText} from "../TypographyText";
import clsx from "clsx";
import {triggerPageViewChange} from "../../../features/PageView/usePageView.tsx";
import {CONST_TEXT_CTA_BUTTON_TEXT} from "../../../misc/consts.ts";
import {EPageViews} from "../../../features/PageView/pageView.model.ts";

type TProps = {
    mode?: 'small' | 'medium' | 'fullwidth';
    handleClick?: Function;
} & Partial<React.ComponentProps<any>>;

const Component = (props: TProps) => {
    const mode = props.mode ?? 'medium';
    const isSmall = mode && mode === 'small';
    const isFullwidth = mode === 'fullwidth';
    const handleClickProp = props.handleClick;
    const handleClick = () => {
        handleClickProp && handleClickProp();
        !handleClickProp && triggerPageViewChange(EPageViews.FORM);
    };

    return (
        <Button
            className={clsx(
                styles.CtaButton,
                {[styles.__small]: isSmall},
                {[styles.__fullwidth]: isFullwidth},
            )}
            mode={props.mode ?? "small"}
            iconUrl={'/icons/plus.svg'}
            onClick={handleClick}
        >
            <TypographyText
                size={isSmall ? 16 : 18}
                color={'var(--color-white)'}
                className={styles.CtaButton}
                {...props}
            >
                {CONST_TEXT_CTA_BUTTON_TEXT}
            </TypographyText>
        </Button>
    );
}

export {Component as CtaButton};

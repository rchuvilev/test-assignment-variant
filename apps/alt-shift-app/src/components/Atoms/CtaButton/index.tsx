import {Button} from "ui-kit";
import styles from './index.module.css';
import {TypographyText} from "../TypographyText";
import clsx from "clsx";
import {EPageViews, triggerPageViewChange} from "../../../features/PageView/usePageView.tsx";
import {CONST_TEXT_CTA_BUTTON_TEXT} from "../../../misc/consts.ts";

type TProps = {
    mode?: 'small' | 'medium';
} & Partial<React.ComponentProps<any>>;

const Component = (props: TProps) => {
    const isSmall = props.mode === 'small';
    const handleClick = () => {
        triggerPageViewChange(EPageViews.FORM);
    };

    return (
        <Button
            className={clsx(
                styles.CtaButton,
                {[styles.__small]: isSmall},
            )}
            mode="small"
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

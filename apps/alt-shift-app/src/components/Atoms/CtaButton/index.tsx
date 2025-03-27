import {Button} from "ui-kit";
import styles from './index.module.css';
import {TypographyText} from "../TypographyText";
import clsx from "clsx";

type TProps = {
    mode?: 'small' | 'medium';
} & Partial<React.ComponentProps<any>>;

const Component = (props: TProps) => {
    const isSmall = props.mode === 'small';
    return (
        <Button
            className={clsx(
                styles.CtaButton,
                {[styles.__small]: isSmall},
            )}
            mode="small"
            iconUrl={'/icons/plus.svg'}
        >
            <TypographyText
                size={isSmall ? 16 : 18}
                color={'var(--color-white)'}
                className={styles.CtaButton}
                {...props}
            >
                Create new
            </TypographyText>
        </Button>
    );
}

export {Component as CtaButton};

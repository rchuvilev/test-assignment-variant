import {Portal} from "@radix-ui/react-portal";
import {useEffect, useRef} from "react";
import {EVENT_TAB_SET_NAME} from "../PageView";
import {CtaButton} from "ui-kit";
import {EPageViews} from "../../models/InitialState.ts";
import style from './index.module.css';
import {CONST_TEXT_CTA_BUTTON_TEXT} from "../../misc/consts.ts";

type TPageViewProps = {
    children?: React.ReactNode;
}

const HeaderPortal = ({}: TPageViewProps) => {
    const getContainer = () => document.getElementById('header-portal') as HTMLElement ?? null;
    const ref = useRef<HTMLElement>(getContainer());
    const container = ref.current;
    const setContainer = () => {
        if (!ref.current) {
            ref.current = getContainer();
        }
    }
    useEffect(() => {
        setContainer();
        !container && window.addEventListener('load', setContainer);
        return () => {
            !container && window.removeEventListener('load', setContainer);
        };
    }, []);
    const handleClick = () => {
        window.dispatchEvent(new CustomEvent(EVENT_TAB_SET_NAME, {detail: EPageViews.FORM}));
    }
    return ref.current && (
        <Portal container={container}>
            <h1>ApplicationsCounter</h1>
            <CtaButton onClick={handleClick}>
                {CONST_TEXT_CTA_BUTTON_TEXT}
            </CtaButton>
        </Portal>
    );
}

export {HeaderPortal};

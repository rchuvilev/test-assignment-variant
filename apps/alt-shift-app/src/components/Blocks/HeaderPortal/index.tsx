import {Portal} from "@radix-ui/react-portal";
import {useContext, useEffect, useRef} from "react";
import {EVENT_TAB_SET_NAME} from "../../Views/PageView";
import {Button, Icon} from "ui-kit";
import {EPageViews} from "../../../models/InitialState.ts";
import style from './index.module.css';
import {CONST_APPLICATIONS_NUMBER_MAX} from "../../../misc/consts.ts";
import clsx from "clsx";
import {AppStateContext} from "../../../features/AppStateContext/useAppStateContext.tsx";
import {utilComponentKey} from "../../../misc/utilComponentKey.ts";

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
        console.log('Go to dashboard');
        window.dispatchEvent(new CustomEvent(EVENT_TAB_SET_NAME, {detail: EPageViews.HOME}));
    }
    return ref.current && (
        <Portal className={clsx(style.Portal)} container={container}>
            <Counter/>
            <Button className={style.Button} onClick={handleClick}>
                <Icon className={style.Icon} src={'/icons/home.svg'} alt="Go to dashboard"/>
            </Button>
        </Portal>
    );
}

function Counter() {
    const {appState} = useContext(AppStateContext);
    const maxApplications = CONST_APPLICATIONS_NUMBER_MAX;
    const currApplications = appState?.datasets?.length ?? 0;
    const isEmpty = currApplications === 0;
    const isFull = currApplications === maxApplications;
    return (
        <div
            className={clsx(
                style.CounterContainer,
                {[style.__empty]: isEmpty},
            )}
        >
            <p className={clsx(style.CounterText, 'font-m')}>
                {currApplications}/{maxApplications} applications generated
            </p>
            {isFull && <img className={style.FullIcon} src={'/icons/checkbox.svg'} alt="Full"/>}
            <div className={style.CounterDots}>
                {new Array(maxApplications).fill(null).map((_, i) => (
                    <div
                        key={utilComponentKey('HeaderApplicationsCounter', i)}
                        className={clsx(
                            style.CounterDot,
                            {[style.CounterDotActive]: i < currApplications},
                        )}
                    />
                ))}
            </div>
        </div>
    )
}

export {HeaderPortal};

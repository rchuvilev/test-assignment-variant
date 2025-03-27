import {Portal} from "@radix-ui/react-portal";
import {useContext, useEffect, useRef} from "react";
import {Button, Icon} from "ui-kit";
import style from './index.module.css';
import {CONST_APPLICATIONS_NUMBER_MAX} from "../../../misc/consts.ts";
import clsx from "clsx";
import {utilComponentKey} from "../../../misc/utilComponentKey.ts";
import {AppContext} from "../../../App.tsx";
import {EPageViews, triggerPageViewChange} from "../../../features/PageView/usePageView.tsx";

type TProps = {}

const HeaderPortal = ({}: TProps) => {
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
        triggerPageViewChange(EPageViews.HOME);
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
    const context = useContext(AppContext);
    const maxApplications = CONST_APPLICATIONS_NUMBER_MAX;
    const currApplications = context?.index ?? 0;
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

import style from './index.module.css';
import clsx from "clsx";
import {PageViewForm} from "../PageViewForm";
import {PageViewHome} from "../PageViewHome";
import {EPageViews} from "../../../features/PageView/pageView.model.ts";

type TProps = {
    view: EPageViews;
}

const Component = ({view}: TProps) => {
    console.log(1111111, 'PageView rerendered');
    return (
        <div className={clsx(style.PageView)}>
            {(() => {
                switch (view) {
                    case EPageViews.FORM:
                        return <PageViewForm/>;
                        break;
                    default:
                        return <PageViewHome/>;
                        break;
                }
            })()}
        </div>
    );
}

export {Component as PageView};

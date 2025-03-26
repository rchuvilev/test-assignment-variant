import {Tabs} from "radix-ui";
import style from './index.module.css';
import {EPageViews} from "../../models/InitialState.ts";
import clsx from "clsx";
import {Form} from "../Form";

type TPageViewProps = {
    className?: string;
}

const FormTab = ({className}: TPageViewProps) => {
    return (
        <Tabs.Content className={clsx(className ?? '', style.Form)} value={EPageViews.FORM}>
            <Form />
        </Tabs.Content>
    );
}

export {FormTab};

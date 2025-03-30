import style from './index.module.css';
import clsx from "clsx";
import {Form} from "../../Blocks/Form";
import {CtaBlock} from "../../Blocks/CtaBlock";
import {Card} from "../../Atoms/Card";
import {useContext} from "react";
import {AppContext} from "../../../App.tsx";

type TProps = {}

const Component = ({}: TProps) => {
    const {currApplicationData, isApplicationLast} = useContext(AppContext);
    if (!currApplicationData) return null;
    const {result, ...formData} = currApplicationData; // separate result from form data not to rerender form on result change
    return (
        <section className={clsx(style.Form)}>
            <div className={'html_page-row'}>
                <Form formData={formData} />
                <Card cardText={result} />
            </div>
            {!isApplicationLast && <CtaBlock />}
        </section>
    );
}

export {Component as PageViewForm};

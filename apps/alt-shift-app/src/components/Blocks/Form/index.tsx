import clsx from "clsx";
import {Form as RadixForm} from "radix-ui";
import style from './index.module.css';
import {TData} from "../../../features/ApplicationsData/applicationsData.model.ts";
import {utilComponentKey} from "../../../misc/utilComponentKey.ts";
import {CtaButton} from "../../Atoms/CtaButton";
import {CONST_TEXT_SUBMIT_BUTTON_TEXT} from "../../../misc/consts.ts";
import {FocusEventHandler, useContext} from "react";
import {AppContext} from "../../../App.tsx";
import {utilDevLogger} from "../../../misc/utilDevLogger.ts";
import {aiRequest} from "../../../features/AiRequest/aiRequest.ts";
import {Field, TField} from "./Field.tsx";

type TProps = {
    formData: Partial<TData>;
}

const Form = ({formData}: TProps) => {
    const {Submit} = RadixForm;
    const {doCurrApplicationUpdate} = useContext(AppContext);

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e: any) => {
        const updatedData = {[e.target.id]: e.target.value};
        utilDevLogger('@Form.handleBlur - Partial update of state with field data:', updatedData);
        doCurrApplicationUpdate(updatedData, false);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Submit!', e);
    };
    const Fields = () => Object.entries(formData)
        .map(([key, value]) => {
            return ({
                keyName: key,
                label: key.split('_').join(' '),
                defaultValue: value,
                handleBlur,
            }) as TField
        })
        .map((fieldData: TField, index: number) => (
           <Field key={utilComponentKey(`Application-Form-Field`, index)} {...fieldData} />
        ));
    const SubmitButton = () => {
        return (
            <Submit asChild>
                <CtaButton handleClick={handleSubmit} mode={"fullwidth"}>
                    {CONST_TEXT_SUBMIT_BUTTON_TEXT}
                </CtaButton>
            </Submit>
        );
    }

    return (
        <RadixForm.Form
            action={aiRequest}
            className={clsx(style.Form)}
            noValidate={false}
        >
            <Fields/>
            <SubmitButton/>
        </RadixForm.Form>
    );
}

export {Form};

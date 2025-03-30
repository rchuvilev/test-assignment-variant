import clsx from "clsx";
import {Form as RadixForm} from "radix-ui";
import style from './index.module.css';
import {TData} from "../../../features/ApplicationsData/applicationsData.model.ts";
import {utilComponentKey} from "../../../misc/utilComponentKey.ts";
import {CtaButton} from "../../Atoms/CtaButton";
import {CONST_TEXT_SUBMIT_BUTTON_TEXT} from "../../../misc/consts.ts";
import React, {FocusEventHandler, useContext} from "react";
import {AppContext} from "../../../App.tsx";
import {TypographyText} from "../../Atoms/TypographyText";
import {utilDevLogger} from "../../../misc/utilDevLogger.ts";
import {aiRequest} from "../../../features/AiRequest/aiRequest.ts";
import {useFormState} from "react-dom";

type TProps = {
    formData: Partial<TData>;
}

type TField = {
    label: string;
    value: string;
    name: string;
    keyName: string;
}

type TControlProps = {
    className: string;
    id: string;
    type?: string;
    required: boolean;
    defaultValue: string;
    onBlur: any;
    tabIndex: number;
}

const formStateHandler = () => {
    return {
        data: {},
        errors: {},
        touched: {},
        isValid: false,
        isSubmitting: false,
    };
}

const Form = ({formData}: TProps) => {
    const {Field, Label, Control, Submit} = RadixForm;
    const {doCurrApplicationUpdate} = useContext(AppContext);

    const handleBlur: FocusEventHandler<HTMLInputElement> = (e: any) => {
        const updatedData = {[e.target.id]: e.target.value};
        utilDevLogger('@Form.handleBlur - Partial update of state with field data:', updatedData);
        doCurrApplicationUpdate(updatedData);
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
                value,
            }) as TField
        })
        .map((fieldData: TField, index: number) => {
            const {label, value, keyName} = fieldData;
            const name = keyName;
            const isTextArea = keyName === 'Additional_details';
            const controlProps: TControlProps = {
                className: clsx(style.Control, (isTextArea ? style.Textarea : style.Input)),
                id: keyName,
                required: true,
                defaultValue: value,
                onBlur: handleBlur,
                tabIndex: 0,
            }
            const ControlComponent = (props: TControlProps) => (
                React.createElement(isTextArea ? 'textarea' : 'input', {...props})
            );
            return (
                <Field
                    name={name}
                    className={style.Field}
                    key={utilComponentKey('Form', `${keyName}-${index}`)}
                >
                    <Label className={style.Label} htmlFor={name}>
                        <TypographyText size={14} color="var(--color-icon-black)" className={style.LabelText}>
                            {label}
                        </TypographyText>
                    </Label>
                    <Control asChild>
                        <ControlComponent {...controlProps} />
                    </Control>
                </Field>
            );
        });
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
            noValidate
        >
            <Fields/>
            <SubmitButton/>
        </RadixForm.Form>
    );
}

export {Form};

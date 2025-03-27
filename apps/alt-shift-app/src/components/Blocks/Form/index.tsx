import {Form as RadixForm} from "radix-ui";
import clsx from "clsx";
import style from './index.module.css';
import {TData} from "../../../features/ApplicationsData/applicationsData.model.ts";
import {utilComponentKey} from "../../../misc/utilComponentKey.ts";
import {CtaButton} from "../../Atoms/CtaButton";
import {CONST_TEXT_SUBMIT_BUTTON_TEXT} from "../../../misc/consts.ts";
import React, {FocusEventHandler, useContext} from "react";
import {AppContext} from "../../../App.tsx";

type TProps = {
    fieldsData: TData['fields'];
}

type TField = {
    label: string;
    value: string;
    name: string;
    type: string;
    required: boolean;
    keyName: string;
}

type TControlProps = {
    className: string;
    id: string;
    type?: string;
    required: boolean;
    defaultValue: string;
    onBlur: any;
}

const Form = ({fieldsData}: TProps) => {
    const {dataHelper} = useContext(AppContext);
    const Form = RadixForm.Root;
    const Submit = RadixForm.Submit;
    const handleBlur: FocusEventHandler<HTMLInputElement> = (e: any) => {
        console.log('onBlur', e);
        dataHelper.saveCurrentDataField(e.target.name, e.target.value);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Submit!', e);
    };
    const {Field, Label, Control} = RadixForm;
    const Fields = () => Object.entries(fieldsData ?? {})
        .map(([key, value]) => ({
            keyName: key,
            label: key.split('_').join(' '),
            value,
            name: key,
            type: 'text',
            required: true,
        }) as TField)
        .map((fieldData: TField, index: number) => {
            const {label, value, keyName} = fieldData;
            const name = keyName;
            const isTextArea = keyName === 'Additional_Details';
            const controlProps: TControlProps = {
                className: clsx(style.Control, (isTextArea ? style.Textarea : style.Input)),
                id: keyName,
                required: true,
                defaultValue: value,
                onBlur: handleBlur,
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
                        {label}
                    </Label>
                    <Control asChild>
                        <ControlComponent {...controlProps} />
                    </Control>
                </Field>
            );
        });
    const SubmitButton = () => {
        return (
            <Submit
                onSubmit={handleSubmit}
                asChild
            >
                <CtaButton mode={"small"}>{CONST_TEXT_SUBMIT_BUTTON_TEXT}</CtaButton>
            </Submit>
        );
    }

    return (
        <Form
            className={clsx(style.Form)}
            noValidate
        >
            <Fields/>
            <SubmitButton/>
        </Form>
    );
}

export {Form};

import React from "react";
import {CONST_TEXT_FORM_TEXT_INPUT_MAX_CHARS, CONST_TEXT_FORM_TEXTAREA_MAX_CHARS} from "../../../misc/consts.ts";
import clsx from "clsx";
import style from "./index.module.css";
import {TypographyText} from "../../Atoms/TypographyText";
import {Form as RadixForm} from "radix-ui";

export type TProps = {
    label: string;
    defaultValue: string;
    name: string;
    keyName: string;
    handleBlur: any;
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

export const Component = ({label, defaultValue, keyName, handleBlur}: TProps) => {
    const {Field, Label, Control} = RadixForm;
    const name = keyName;
    const isTextArea = keyName === 'Additional_details';
    const [value, setValue] = React.useState(defaultValue);
    const valueLength = value?.length;
    let isError: string;
    switch (true) {
        case !valueLength:
            isError = 'This field is required';
            break;
        case isTextArea && valueLength > CONST_TEXT_FORM_TEXTAREA_MAX_CHARS:
            isError = `Please be more laconic, ${CONST_TEXT_FORM_TEXTAREA_MAX_CHARS} characters maximum`;
            break;
        case !isTextArea && valueLength > CONST_TEXT_FORM_TEXT_INPUT_MAX_CHARS:
            isError = `Please be more laconic, ${CONST_TEXT_FORM_TEXT_INPUT_MAX_CHARS} characters maximum`;
            break;
        default:
            isError = '';
            break;
    }
    ;
    let updateValueTO: any = null;
    const controlProps: TControlProps = {
        className: clsx(style.Control, (isTextArea ? style.Textarea : style.Input), {
            [style.__error]: isError
        }),
        id: keyName,
        tabIndex: 0,
        required: true,
        defaultValue: value,
        onBlur: (e: any) => {
            updateValueTO && clearTimeout(updateValueTO);
            updateValueTO = setTimeout(() => {
                setValue(e.target.value);
                handleBlur(e);
            }, 200);
        },
    }
    const ControlComponent = (props: TControlProps) => (
        React.createElement(isTextArea ? 'textarea' : 'input', {...props})
    );
    return (
        <Field
            name={name}
            className={style.Field}
        >
            <Label className={style.Label} htmlFor={name}>
                <TypographyText size={14} color="var(--color-icon-black)" className={style.LabelText}>
                    {label}
                </TypographyText>
            </Label>
            <Control asChild>
                <ControlComponent {...controlProps} />
            </Control>
            {isTextArea && (
                <div className={style.CharCounter}>
                    <TypographyText
                        size={14}
                        className={style.MessageText}
                        color={valueLength > CONST_TEXT_FORM_TEXTAREA_MAX_CHARS
                            ? 'var(--color-red-error-text)'
                            : 'var(--color-gray-dark)'
                        }
                    >
                        {`${valueLength} / ${CONST_TEXT_FORM_TEXTAREA_MAX_CHARS}`}
                    </TypographyText>
                </div>
            )}
        </Field>
    );
}

export {Component as Field};
export type TField = TProps;

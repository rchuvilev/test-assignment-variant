import clsx from "clsx";
import style from './index.module.css';
import {TData} from "../../../features/ApplicationsData/applicationsData.model.ts";
import {utilComponentKey} from "../../../misc/utilComponentKey.ts";
import {CtaButton} from "../../Atoms/CtaButton";
import {CONST_TEXT_SUBMIT_BUTTON_TEXT} from "../../../misc/consts.ts";
import React, {FocusEventHandler, useContext} from "react";
import {AppContext} from "../../../App.tsx";
import {TypographyText} from "../../Atoms/TypographyText";

type TProps = {
    fieldsData: TData['fields'];
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

const Form = ({fieldsData}: TProps) => {
    const {dataHelper} = useContext(AppContext);
    const handleBlur: FocusEventHandler<HTMLInputElement> = (e: any) => {
        console.log('onBlur', e);
        dataHelper.saveCurrentDataField(e.target.name, e.target.value);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Submit!', e);
    };
    const Fields = () => Object.entries(fieldsData ?? {})
        .map(([key, value]) => ({
            keyName: key,
            label: key.split('_').join(' '),
            value,
        }) as TField)
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
                tabIndex: index + 1,
            }
            const ControlComponent = (props: TControlProps) => (
                React.createElement(isTextArea ? 'textarea' : 'input', {...props})
            );
            return (
                <div
                    className={style.Field}
                    key={utilComponentKey('Form', `${keyName}-${index}`)}
                >
                    <label className={style.Label} htmlFor={name}>
                        <TypographyText size={14} color="var(--color-icon-black)" className={style.LabelText}>
                            {label}
                        </TypographyText>
                    </label>
                    <ControlComponent {...controlProps} />
                </div>
            );
        });
    const SubmitButton = () => {
        return (
            <CtaButton handleClick={handleSubmit} mode={"fullwidth"}>
                {CONST_TEXT_SUBMIT_BUTTON_TEXT}
            </CtaButton>
        );
    }

    return (
        <form
            className={clsx(style.Form)}
            noValidate
        >
            <Fields/>
            <SubmitButton/>
        </form>
    );
}

export {Form};

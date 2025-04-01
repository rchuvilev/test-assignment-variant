import React, { useContext, useRef } from "react";
import {
  CONST_TEXT_FORM_TEXT_INPUT_MAX_CHARS,
  CONST_TEXT_FORM_TEXTAREA_MAX_CHARS,
} from "../../../misc/consts.ts";
import clsx from "clsx";
import style from "./index.module.css";
import { TypographyText } from "../../Atoms/TypographyText";
import { Form as RadixForm } from "radix-ui";
import {
  getPlaceholder,
  TData,
} from "../../../features/ApplicationsData/applicationsData.model.ts";
import { AppContext } from "../../../App.tsx";

export type TProps = {
  label: string;
  defaultValue: string;
  name: string;
  keyName: string;
  handleBlur: any;
};

type TControlProps = {
  className: string;
  ref: any;
  id: string;
  type?: string;
  required: boolean;
  placeholder: string;
  tabIndex: number;
  defaultValue: string;
  onBlur: any;
  onChange: any;
  onFocus?: any;
};

export const Component = ({
  label,
  defaultValue,
  keyName,
  handleBlur,
}: TProps) => {
  const { Field, Label, Control } = RadixForm;
  const { doCurrApplicationUpdate } = useContext(AppContext);
  const name = keyName;
  const inputRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLElement>(null);
  const errorMsgRef = useRef<HTMLElement>(null);
  const isTextArea = keyName === "Additional_details";
  const textAreaCounterText = (length: number) =>
    `${length} / ${CONST_TEXT_FORM_TEXTAREA_MAX_CHARS}`;
  const red = "var(--color-red-error-text)";
  const gray = "var(--color-gray-dark)";
  const textAreaCounterColor = (length: number) =>
    length > CONST_TEXT_FORM_TEXTAREA_MAX_CHARS ? red : gray;
  let updateValueTO: any = null;
  const handleChange = (e: any) => {
    updateValueTO && clearTimeout(updateValueTO);
    updateValueTO = setTimeout(() => {
      const valueLength = e.target.value.length;
      let error: string = "";
      switch (true) {
        case !valueLength:
          error = "⠀"; // 'This field is required';
          break;
        case isTextArea && valueLength > CONST_TEXT_FORM_TEXTAREA_MAX_CHARS:
          error = `Please be more laconic, ${CONST_TEXT_FORM_TEXTAREA_MAX_CHARS} characters maximum`;
          break;
        case !isTextArea && valueLength > CONST_TEXT_FORM_TEXT_INPUT_MAX_CHARS:
          error = `Please be more laconic, ${CONST_TEXT_FORM_TEXT_INPUT_MAX_CHARS} characters maximum`;
          break;
        default:
          break;
      }
      inputRef?.current &&
        inputRef.current.classList[error ? "add" : "remove"](style.__error);
      const errorMsg = errorMsgRef?.current?.querySelector("span");
      errorMsg && (errorMsg.innerText = error);
      const counter = counterRef?.current?.querySelector("span");
      counter && (counter.innerText = textAreaCounterText(valueLength));
      counter?.style.setProperty("--text-color", error ? red : gray);
      doCurrApplicationUpdate({ [keyName]: e.target.value }, false);
    }, 50);
  };
  const placeholder = getPlaceholder(keyName as keyof TData);
  const controlProps: TControlProps = {
    ref: inputRef,
    className: clsx(style.Control, isTextArea ? style.Textarea : style.Input),
    id: keyName,
    tabIndex: 0,
    required: true,
    defaultValue,
    placeholder,
    onBlur: (e: any) => {
      handleBlur(e);
      handleChange(e);
    },
    onChange: handleChange,
    // onFocus: handleChange,
  };
  const ControlComponent = (props: TControlProps) =>
    React.createElement(isTextArea ? "textarea" : "input", {
      minLength: 1,
      maxLength: isTextArea
        ? CONST_TEXT_FORM_TEXTAREA_MAX_CHARS
        : CONST_TEXT_FORM_TEXT_INPUT_MAX_CHARS,
      ...props,
    });
  return (
    <Field name={name} className={style.Field}>
      <Label className={style.Label} htmlFor={name}>
        <TypographyText
          size={14}
          color="var(--color-icon-black)"
          className={style.LabelText}
        >
          {label}
        </TypographyText>
      </Label>
      <Control asChild>
        <ControlComponent {...controlProps} />
      </Control>
      {!isTextArea && (
        <div ref={errorMsgRef as any} className={style.ErrorMsg}>
          <TypographyText size={14} color="var(--color-red-error-text)">
            {""}
          </TypographyText>
        </div>
      )}
      {isTextArea && (
        <div ref={counterRef as any} className={style.CharCounter}>
          <TypographyText
            size={14}
            className={style.MessageText}
            color={textAreaCounterColor(defaultValue.length)}
          >
            {textAreaCounterText(defaultValue.length)}
          </TypographyText>
        </div>
      )}
    </Field>
  );
};

export { Component as Field };
export type TField = TProps;

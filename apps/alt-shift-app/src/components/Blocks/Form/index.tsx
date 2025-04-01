import clsx from "clsx";
import { Form as RadixForm } from "radix-ui";
import style from "./index.module.css";
import { TData } from "../../../features/ApplicationsData/applicationsData.model.ts";
import { utilComponentKey } from "../../../misc/utilComponentKey.ts";
import { CtaButton } from "../../Atoms/CtaButton";
import {
  CONST_NOOP_FUNCTION,
  CONST_TEXT_SUBMIT_BUTTON_DONE_TEXT,
  CONST_TEXT_SUBMIT_BUTTON_TEXT,
} from "../../../misc/consts.ts";
import { FocusEventHandler, useContext, useState } from "react";
import { AppContext } from "../../../App.tsx";
import { utilDevLogger } from "../../../misc/utilDevLogger.ts";
import { aiRequest } from "../../../features/AiRequest/aiRequest.ts";
import { Field, TField } from "./Field.tsx";

type TProps = {
  formData: Partial<TData>;
};

const Form = ({ formData }: TProps) => {
  const { Submit } = RadixForm;
  const { doCurrApplicationUpdate, isApplicationFull } = useContext(AppContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e: any) => {
    const updatedData = { [e.target.id]: e.target.value };
    utilDevLogger(
      "@Form.handleBlur - Partial update of state with field data:",
      updatedData,
    );
    doCurrApplicationUpdate(updatedData, false);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmitting(true);
    const formData = new FormData(e.target);
    const reqData: TData = Object.fromEntries(
      formData.entries(),
    ) as Partial<TData> as TData;
    aiRequest({
      reqData,
      onSuccess: (resData: string) => {
        const updatedData = { ...reqData, result: resData };
        utilDevLogger("@Form.handleSubmit - Success:", updatedData);
        doCurrApplicationUpdate(updatedData, true);
      },
      onError: (err: any) => {
        utilDevLogger(
          "@Form.handleSubmit - Error:",
          err,
          'result is set to ""',
        );
      },
      onFinally: () => {
        setIsSubmitting(false);
      },
    });
  };

  const Fields = () =>
    Object.entries(formData)
      .map(([key, value]) => {
        return {
          keyName: key,
          label: key.split("_").join(" "),
          defaultValue: value,
          handleBlur,
        } as TField;
      })
      .map((fieldData: TField, index: number) => (
        <Field
          key={utilComponentKey(`Application-Form-Field`, index)}
          {...fieldData}
        />
      ));

  const SubmitButton = () => {
    const isFormDone = isApplicationFull;
    const buttonIcon = isSubmitting
      ? "/test-assignment-variant/icons/loader.svg"
      : isFormDone
        ? "/test-assignment-variant/icons/refresh.svg"
        : "";
    const buttonText = isSubmitting
      ? ""
      : isFormDone
        ? CONST_TEXT_SUBMIT_BUTTON_DONE_TEXT
        : CONST_TEXT_SUBMIT_BUTTON_TEXT;
    return (
      <Submit asChild>
        <CtaButton
          mode={"fullwidth"}
          icon={buttonIcon}
          className={clsx(
            style.SubmitButton,
            { [style.__submitting]: isSubmitting },
            { [style.__retry]: isFormDone },
          )}
          color={isFormDone ? "var(--font-color-black)" : "var(--color-white)"}
          disabled={isSubmitting}
          handleClick={CONST_NOOP_FUNCTION}
        >
          {buttonText}
        </CtaButton>
      </Submit>
    );
  };

  return (
    <RadixForm.Form
      onSubmit={handleSubmit}
      className={clsx(style.Form, {
        [style.__submitting]: isSubmitting,
      })}
      noValidate={false}
    >
      <Fields />
      <SubmitButton />
    </RadixForm.Form>
  );
};

export { Form };

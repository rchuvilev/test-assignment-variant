import style from "./index.module.css";
import clsx from "clsx";
import { Form } from "../../Blocks/Form";
import { CtaBlock } from "../../Blocks/CtaBlock";
import { Card } from "../../Atoms/Card";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../App.tsx";

type TProps = {};

const Component = ({}: TProps) => {
  const { currApplicationData, isApplicationLast, isApplicationFull } =
    useContext(AppContext);
  const cardRef = useRef<HTMLElement>(null);
  if (!currApplicationData) return null;
  const { result, ...formData } = currApplicationData; // separate result from form data not to rerender form on result change
  useEffect(() => {
    result &&
      result.length > 1 &&
      cardRef?.current?.scrollIntoView?.({ behavior: "smooth" });
  }, [result, cardRef?.current]);
  return (
    <div className={"html_page-row"}>
      <section className={clsx(style.FormView)}>
        <Form formData={formData} />
        <Card ref={cardRef} cardText={result || " "} />
      </section>
      {!isApplicationLast && isApplicationFull && <CtaBlock />}
    </div>
  );
};

export { Component as PageViewForm };

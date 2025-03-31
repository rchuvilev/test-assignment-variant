import style from "./index.module.css";
import clsx from "clsx";
import { Form } from "../../Blocks/Form";
import { CtaBlock } from "../../Blocks/CtaBlock";
import { Card } from "../../Atoms/Card";
import { useContext } from "react";
import { AppContext } from "../../../App.tsx";

type TProps = {};

const Component = ({}: TProps) => {
  const { currApplicationData, isApplicationLast } = useContext(AppContext);
  if (!currApplicationData) return null;
  const { result, ...formData } = currApplicationData; // separate result from form data not to rerender form on result change
  return (
    <div className={"html_page-row"}>
      <section className={clsx(style.FormView)}>
        <Form formData={formData} />
        <Card cardText={result} />
      </section>
      {!isApplicationLast && <CtaBlock />}
    </div>
  );
};

export { Component as PageViewForm };

import { Portal } from "@radix-ui/react-portal";
import { useContext, useEffect, useRef } from "react";
import { Button, Icon } from "ui-kit";
import style from "./index.module.css";
import clsx from "clsx";
import { triggerPageViewChange } from "../../../features/PageView/usePageView.tsx";
import { EPageViews } from "../../../features/PageView/pageView.model.ts";
import { Counter } from "../../Atoms/Counter";
import { AppContext } from "../../../App.tsx";
import { applicationsDataHelper } from "../../../features/ApplicationsData/applicationsData.helper.ts";

type TProps = {};

const HeaderPortal = ({}: TProps) => {
  const {
    doCurrApplicationUpdate,
    currApplicationIndex,
    doGotoNextApplication,
  } = useContext(AppContext);
  const getContainer = () =>
    (document.getElementById("header-portal") as HTMLElement) ?? null;
  const ref = useRef<HTMLElement>(getContainer());
  const container = ref.current;
  const setContainer = () => {
    if (!ref.current) {
      ref.current = getContainer();
    }
  };
  useEffect(() => {
    setContainer();
    !container && window.addEventListener("load", setContainer);
    return () => {
      !container && window.removeEventListener("load", setContainer);
    };
  }, []);

  const handleClick = () => {
    const update = applicationsDataHelper?.data?.[currApplicationIndex];
    update && doCurrApplicationUpdate({ ...update }, false);
    doGotoNextApplication();
    triggerPageViewChange(EPageViews.HOME);
  };

  const HomeButton = () => (
    <Button className={style.Button} onClick={handleClick}>
      <Icon
        className={style.Icon}
        src={"/test-assignment-variant/icons/home.svg"}
        alt="Go to dashboard"
      />
    </Button>
  );

  return (
    ref.current && (
      <>
        <Portal className={clsx(style.Portal)} container={container}>
          <HomeButton />
          <Counter />
          <HomeButton />
        </Portal>
      </>
    )
  );
};

export { HeaderPortal };

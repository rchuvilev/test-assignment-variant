import { useEffect, useState } from "react";
import { CONST_CUSTOM_EVENT_NAME_CHANGE_VIEW } from "../../misc/consts.ts";
import { EPageViews, TSetView } from "./pageView.model.ts";

class PageViewChange {
  static eventName = CONST_CUSTOM_EVENT_NAME_CHANGE_VIEW;
  static handleEventViewChange(setView: TSetView) {
    const eventName = PageViewChange.eventName;
    const handler = (ev: CustomEvent) => {
      const view = ev?.detail as EPageViews;
      view && setView(view);
    };
    const addListener = () =>
      window.addEventListener(eventName as any, handler);
    const removeListener = () =>
      window.removeEventListener(eventName as any, handler);
    return [addListener, removeListener];
  }
  static triggerEventViewChange(view: EPageViews) {
    const eventName = PageViewChange.eventName;
    const event = new CustomEvent(eventName, { detail: view });
    window.dispatchEvent(event);
  }
}

const usePageView = () => {
  const [view, setView] = useState<EPageViews>(EPageViews.HOME);
  useEffect(() => {
    const [addListener, removeListener] =
      PageViewChange.handleEventViewChange(setView);
    addListener();
    return () => {
      removeListener();
    };
  }, []);
  return view;
};

const triggerPageViewChange = (view: EPageViews) => {
  PageViewChange.triggerEventViewChange(view);
};

export { usePageView, triggerPageViewChange };

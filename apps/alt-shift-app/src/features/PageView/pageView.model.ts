export enum EPageViews {
  HOME = "Home",
  FORM = "Create New",
}

export type TViewContext = {
  view: EPageViews;
};

export type TSetView = (view: EPageViews) => void;

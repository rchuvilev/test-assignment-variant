import style from "./index.module.css";

type TApplicationCardProps = {
  children: React.ReactNode;
};

const ApplicationCard = (props: TApplicationCardProps) => {
  return <div className="modal-page">{props.children}</div>;
};

export { ApplicationCard };

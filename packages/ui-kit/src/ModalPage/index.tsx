import style from './index.module.css';

type TModalPageProps = {
    children: React.ReactNode;
}

const ModalPage = (props: TModalPageProps) => {
    return <div className="modal-page">{props.children}</div>;
}

export {ModalPage};

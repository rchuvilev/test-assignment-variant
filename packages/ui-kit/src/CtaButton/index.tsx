import style from './index.css';

type CtaButtonProps = {
    children: React.ReactNode;
    ref?: React.Ref<any>;
} & React.ComponentProps<any>;

const CtaButton = (props: CtaButtonProps) => {
    return <button className="cta-button" {...props}>{props.children}</button>;
}

export {CtaButton};

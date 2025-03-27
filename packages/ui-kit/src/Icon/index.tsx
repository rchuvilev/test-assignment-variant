import clsx from "clsx";
import style from './index.module.css';

type CtaButtonProps = {
    width?: number;
    height?: number;
    className?: string;
} & React.ComponentProps<'img'>;
const Icon = (props: CtaButtonProps) => {
    const {width, height, className, ...rest} = props;
    return <img
        {...rest}
        className={clsx(className ?? '', style.Icon)}
        width={width ?? 20}
        height={height ?? 20}
    />;
}

export {Icon};

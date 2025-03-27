import clsx from "clsx";
import styles from './index.module.css';
import {useContext} from "react";
import {AppContext} from "../../../App.tsx";
import {TData} from "../../../features/ApplicationsData/applicationsData.model.ts";
import {utilComponentKey} from "../../../misc/utilComponentKey.ts";
import {Card} from "../../Atoms/Card";

type TProps = {
}

const Component = ({}: TProps) => {
    const {allData} = useContext(AppContext);
    return (
        <div className={clsx(styles.CardsList)}>
            {allData.map((data: TData, index) => (
                <Card
                    key={utilComponentKey('CardsList', index)}
                    cardText={data?.result}
                    maxHeightPx={240}
                />
            ))}
        </div>
    );
}

export {Component as CardsList};

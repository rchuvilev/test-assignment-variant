import clsx from "clsx";
import styles from './index.module.css';
import {TData} from "../../../features/ApplicationsData/applicationsData.model.ts";
import {utilComponentKey} from "../../../misc/utilComponentKey.ts";
import {Card} from "../../Atoms/Card";

type TProps = {
    dataset: TData[];
}

const Component = ({dataset}: TProps) => {
    return dataset?.map && (
        <div className={clsx(styles.CardsList)}>
            {dataset.map((data: TData, index) => (
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

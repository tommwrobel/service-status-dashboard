import "./ObjectInfoBox.css";

type ObjectInfoBoxProps = {
    data: Record<any, string | number>;
};

const ObjectInfoBox = ({ data }: ObjectInfoBoxProps): JSX.Element => {
    return (
        <ul className="InfoBoxWrapper">
            {Object.entries(data).map(([key, value]) => (
                <li key={key}>
                    <span className="infoKey">{key}:&nbsp;</span>
                    <span className="infoValue">{value}</span>
                </li>
            ))}
        </ul>
    );
};

export default ObjectInfoBox;

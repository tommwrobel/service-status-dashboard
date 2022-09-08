import { AutoTableColumn, TableDataRow, TableDataValue } from "../AutoTableTypes";
import { Maybe } from "../../../types/types";
import { TableCell, TableRow } from "@mui/material";

type AutoTableDataProps = {
    columns: AutoTableColumn[],
    data: TableDataRow[],
}

const AutoTableData = ({columns, data}: AutoTableDataProps): JSX.Element => {

    const renderCellContent = (value: TableDataValue, valueProcessor: Maybe<(value: TableDataValue) => JSX.Element>): JSX.Element => {
        if (valueProcessor) return valueProcessor(value);
        if (value === null || value === undefined) return <></>;
        if (typeof value === 'object') return <>{JSON.stringify(value)}</>;
        return <>{value}</>;
    }

    return (
        <tbody>
            {data.map(dataRow => (
                <TableRow key={JSON.stringify(dataRow)}>
                    {columns.filter(column => column.isVisible !== false).map(column => (
                        <TableCell key={column.key}>
                            {renderCellContent(dataRow[column.key], column.valueProcessor)}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </tbody>
    );
}

export default AutoTableData;

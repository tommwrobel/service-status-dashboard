import {
    AutoTableColumn,
    TableDataRow,
    TableDataValue,
} from "../AutoTableTypes";
import { Maybe } from "../../../types/types";
import { TableCell, TableRow } from "@mui/material";
import "./../AutoTable.css";

type AutoTableDataProps = {
    columns: AutoTableColumn[];
    data?: TableDataRow[];
};

const AutoTableData = ({ columns, data }: AutoTableDataProps): JSX.Element => {

    const renderCellContent = (
        value: TableDataValue,
        dataRow: TableDataRow,
        valueProcessor: Maybe<(value: TableDataValue, dataRow: Maybe<TableDataRow>) => JSX.Element>
    ): JSX.Element => {
        if (valueProcessor) return valueProcessor(value, dataRow);
        if (value === null || value === undefined) return <></>;
        if (typeof value === "object")
            return (
                <>
                    <pre>{JSON.stringify(value)}</pre>
                </>
            );
        return <>{value}</>;
    };

    if (!data || data.length === 0) return (
        <tbody>
            <TableRow>
                <TableCell colSpan={columns.length}>
                    <span  className="noDataTxt">No available data.</span>
                </TableCell>
            </TableRow>
        </tbody>
    );

    return (
        <tbody>
            {data.map((dataRow) => (
                <TableRow key={JSON.stringify(dataRow)} hover>
                    {columns
                        .filter((column) => column.isVisible !== false)
                        .map((column) => (
                            <TableCell key={column.key}>
                                {renderCellContent(
                                    dataRow[column.key],
                                    dataRow,
                                    column.valueProcessor
                                )}
                            </TableCell>
                        ))}
                </TableRow>
            ))}
        </tbody>
    );
};

export default AutoTableData;

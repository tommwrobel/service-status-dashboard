import { Paper, SortDirection, Table, TableContainer } from "@mui/material";
import AutoTableHead from "./AutoTableHead/AutoTableHead";
import { AutoTableColumn, TableDataRow } from "./AutoTableTypes";
import { useEffect, useState } from "react";
import { Maybe, Nullable } from "../../types/types";
import AutoTableData from "./AutoTableData/AutoTableData";
import { findObjectByKey, tableDataComparator } from "./AutoTableSupport";

type AutoTableProps = {
    columns: AutoTableColumn[],
    data?: TableDataRow[],
}

const AutoTable = (props: AutoTableProps): JSX.Element => {

    const [sortBy, setSortBy] = useState<Nullable<string>>(null);
    const [columns, setColumns] = useState<AutoTableColumn[]>(props.columns);
    const [data, setData] = useState<Maybe<TableDataRow[]>>(undefined);
    const [sortDirection, setSortDirection] = useState<SortDirection>(false);

    const sortData = (data: Maybe<TableDataRow[]>): Maybe<TableDataRow[]> => {
        if (!data) return undefined;
        const sortedData: TableDataRow[] = data;
        if (data && sortBy !== null && sortDirection && columns) {
            sortedData.sort((a, b) =>
                tableDataComparator(a[sortBy], b[sortBy], sortDirection, findObjectByKey(sortBy, columns)?.valueComparator));
        }
        return sortedData;
    }

    useEffect(() => {
        setData(sortData(props.data));
    }, [props.data]);

    useEffect(() => {
        setColumns(props.columns);
    }, [props.columns]);

    useEffect(() => {
        if (data && sortBy !== null && columns) {
            const sortedData = [...data];
            sortedData.sort((a, b) =>
                tableDataComparator(a[sortBy], b[sortBy], sortDirection, findObjectByKey(sortBy, columns)?.valueComparator));
            setData(sortedData);
        }
        if (sortBy === null) setData(props.data);
    }, [sortBy, sortDirection]);

    const handleHideColumn = (columnKey: string): void => {
        setColumns(col => col.map(column => (
            column.key === columnKey ? {...column, isVisible: false} : column
        )))
    };

    const handleSortBy = (columnKey: string): void => {
        if (sortBy === columnKey && sortDirection === 'asc') {
            setSortDirection('desc');
        } else if (sortBy === columnKey && sortDirection === 'desc') {
            setSortDirection(false);
            setSortBy(null);
        } else if (sortBy !== columnKey) {
            setSortBy(columnKey);
            setSortDirection('asc');
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <AutoTableHead
                    columns={columns}
                    onHideColumn={handleHideColumn}
                    onSortBy={handleSortBy}
                    sortBy={sortBy}
                    sortDirection={sortDirection}
                />

                <AutoTableData
                    columns={columns}
                    data={data}
                />
            </Table>
        </TableContainer>
    );
}

export default AutoTable;

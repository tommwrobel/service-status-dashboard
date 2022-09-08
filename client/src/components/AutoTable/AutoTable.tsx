import { SortDirection, Table } from "@mui/material";
import AutoTableHead from "./AutoTableHead/AutoTableHead";
import { AutoTableColumn, TableDataRow } from "./AutoTableTypes";
import { useEffect, useState } from "react";
import { Nullable } from "../../types/types";
import AutoTableData from "./AutoTableData/AutoTableData";
import { findObjectByKey, tableDataComparator } from "./AutoTableSupport";

type AutoTableProps = {
    columns: AutoTableColumn[],
    data: TableDataRow[],
}

const AutoTable = (props: AutoTableProps): JSX.Element => {

    const [sortBy, setSortBy] = useState<Nullable<string>>(null);
    const [columns, setColumns] = useState<AutoTableColumn[]>(props.columns);
    const [data, setData] = useState<TableDataRow[]>(props.data);
    const [sortDirection, setSortDirection] = useState<SortDirection>(false);

    useEffect(() => {
        if (sortBy !== null && columns) {
            const sortedData = [...data];
            sortedData.sort((a, b) => tableDataComparator(a[sortBy], b[sortBy], sortDirection, findObjectByKey(sortBy, columns)?.valueComparator));
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
            return;
        }

        if (sortBy === columnKey && sortDirection === 'desc') {
            setSortDirection(false);
            setSortBy(null);
            return;
        }

        if (sortBy !== columnKey) {
            setSortBy(columnKey);
            setSortDirection('asc');
        }
    }

    return (
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
    );
}

export default AutoTable;

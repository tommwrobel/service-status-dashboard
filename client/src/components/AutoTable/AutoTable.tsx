import { Paper, SortDirection, Table, TableContainer } from "@mui/material";
import AutoTableHead from "./AutoTableHead/AutoTableHead";
import { AutoTableColumn, TableDataRow } from "./AutoTableTypes";
import { useEffect, useState } from "react";
import { Maybe, Nullable } from "../../types/types";
import AutoTableData from "./AutoTableData/AutoTableData";
import { findObjectByKey, searchDataRows, tableDataComparator } from "./AutoTableSupport";
import AutoTableBar from "./AutoTableBar/AutoTableBar";

type AutoTableProps = {
    title?: string,
    columns: AutoTableColumn[],
    data?: TableDataRow[],
    searchBy?: string[],
    startBarContent?: JSX.Element,
    endBarContent?: JSX.Element,
}

const AutoTable = (props: AutoTableProps): JSX.Element => {

    const [columns, setColumns] = useState<AutoTableColumn[]>(props.columns);
    const [data, setData] = useState<Maybe<TableDataRow[]>>(undefined);

    const [sortBy, setSortBy] = useState<Nullable<string>>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(false);

    const [searchText, setSearchText] = useState<Nullable<string>>(null);

    useEffect(() => {
        const sortData = (
            data: Maybe<TableDataRow[]>
        ): Maybe<TableDataRow[]> => {
            if (!data || !sortBy || !sortDirection || !columns) return data;

            return [...data].sort((a, b) =>
                tableDataComparator(a[sortBy], b[sortBy], sortDirection,
                    findObjectByKey(sortBy, columns)?.valueComparator));
        }
        setData(sortData(searchDataRows(props.data, searchText, props.searchBy)));
    }, [props.data, sortBy, sortDirection, columns, searchText, props.searchBy]);

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

    const handleHideColumn = (columnKey: string): void => {
        setColumns(col => col.map(column => (
            column.key === columnKey ? {...column, isVisible: false} : column
        )));
        if (sortBy === columnKey) setSortBy(null);
    };

    const hasHiddenColumns = (): boolean => {
        return columns.find(col => col.isVisible === false) ? true : false;
    }

    const hasHideableColumns = (): boolean => {
        return columns.find(col => col.isHideable === true) ? true : false;
    }

    const handleShowAllColumns = (): void => {
        if (hasHiddenColumns()) {
            setColumns(columns => columns.map(col => ({...col, isVisible: true})));
        }
    };

    return (
        <TableContainer component={Paper}>
            <AutoTableBar
                title={props.title}
                isMenuAvailable={hasHideableColumns()}
                isSearchingAvailable={props.searchBy ? true : false}
                onSearch={setSearchText}
                onShowAllColumns={handleShowAllColumns}
                startContent={props.startBarContent}
                endContent={props.endBarContent}
            />
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

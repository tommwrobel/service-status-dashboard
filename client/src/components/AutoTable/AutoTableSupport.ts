import { SortDirection } from "@mui/material";
import { ObjectWithKey, TableDataRow, TableDataValue } from "./AutoTableTypes";
import { Maybe, Nullable } from "../../types/types";

export const tableDataComparator = (
    a: TableDataValue,
    b: TableDataValue,
    sortDirection: SortDirection,
    valueComparator?: (a: TableDataValue, b: TableDataValue) => number,
): number => {
    if (sortDirection === false) return 0;

    const sortDirectionModifier = sortDirection === 'desc' ? -1 : 1;

    if ((a === null || a === undefined) && (b === null || b === undefined)) return 0;
    if ((a !== null && a !== undefined) && (b === null || b === undefined)) return 1 * sortDirectionModifier;
    if ((a === null || a === undefined) && (b !== null && b !== undefined)) return -1 * sortDirectionModifier;

    if ( valueComparator ) return valueComparator(a, b) * sortDirectionModifier;
    if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b) * sortDirectionModifier;
    if (typeof a === 'number' && typeof b === 'number') return (a - b) * sortDirectionModifier;
    return 0;
}

export const findObjectByKey = <T extends ObjectWithKey>(key: string, objects: T[]): Maybe<T> => {
    return objects.find(object => object.key === key);
}

const searchDataValue = (
    dataValue: Maybe<TableDataValue>,
    searchText: string,
): boolean => {
    if (!dataValue) return false;
    const regex = new RegExp(searchText,"gi");
    return !!JSON.stringify(dataValue)
        .replaceAll(/"[a-zA-Z0-9]+":/g, '')
        .match(regex);
}

const searchDataRow = (
    dataRow: TableDataRow,
    searchText: string,
    columnKeys: string[]
): boolean => {
    return Object.keys(dataRow)
        .filter(key => columnKeys.includes(key))
        .filter(((key: keyof typeof dataRow) => searchDataValue(dataRow[key], searchText))).length > 0;
}

export const searchDataRows = (
    dataRows: Maybe<TableDataRow[]>,
    searchText: Nullable<string>,
    columnKeys: Maybe<string[]>
): Maybe<TableDataRow[]> => {

    if (!dataRows || !searchText || searchText.length === 0 || !columnKeys) return dataRows;

    return dataRows.filter(dataRow => searchDataRow(dataRow, searchText, columnKeys));
}



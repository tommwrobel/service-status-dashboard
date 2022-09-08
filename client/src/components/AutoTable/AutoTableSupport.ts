import { SortDirection } from "@mui/material";
import { ObjectWithKey, TableDataValue } from "./AutoTableTypes";
import { Maybe } from "../../types/types";

export const tableDataComparator = (
    a: TableDataValue,
    b: TableDataValue,
    sortDirection: SortDirection,
    valueComparator?: (a: TableDataValue, b: TableDataValue) => number,
): number => {
    if (sortDirection === false) return 0;
    const sortDirectionModifier = sortDirection === 'desc' ? -1 : 1;
    if ( valueComparator ) return valueComparator(a, b) * sortDirectionModifier;
    if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b) * sortDirectionModifier;
    if (typeof a === 'number' && typeof b === 'number') return (a - b) * sortDirectionModifier;
    return 0;
}

export const findObjectByKey = <T extends ObjectWithKey>(key: string, objects: T[]): Maybe<T> => {
    return objects.find(object => object.key === key);
}

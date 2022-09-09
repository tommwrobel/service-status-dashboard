import { DataStatus } from "../../types/types";

export interface AutoTableColumn {
    key: string,
    displayName: string,
    isVisible?: boolean,
    isSortable?: boolean,
    isHideable?: boolean,
    valueProcessor?: (value: any, data: any) => JSX.Element,
    valueComparator?: (a: any, b: any) => number,
};

export interface ObjectWithKey {
    key: string,
}

export type TableDataValue = string | number | object | undefined | null;

export interface TableDataRow {
    dataStatus: DataStatus,
    [key: string]: TableDataValue,
}

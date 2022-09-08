export interface AutoTableColumn {
    key: string,
    displayName: string,
    isVisible?: boolean,
    isSortable?: boolean,
    isHideable?: boolean,
    valueProcessor?: (value: TableDataValue) => JSX.Element,
    valueComparator?: (a: any, b: any) => number,
};

export interface ObjectWithKey {
    key: string,
}

export type TableDataValue = string | number | object;
export type TableDataRow = Record<string, TableDataValue>;

import { SortDirection, TableCell } from "@mui/material";
import { AutoTableColumn } from "../AutoTableTypes";
import classes from "./../AutoTable.module.css";
import SortByButton from "../SortByButton/SortByButton";
import HideColumnButton from "../HideColumnButton/HideColumnButton";

type AutoTableHeadProps = {
    column: AutoTableColumn,
    onHideColumn: (columnKey: string) => void,
    onSortBy: (columnKey: string) => void,
    sortDirection: SortDirection;
}

const AutoTableHeadCell = ({column, onHideColumn, onSortBy, sortDirection}: AutoTableHeadProps): JSX.Element => {

    return (
        <TableCell>
            <div className={classes.headCellContainer}>
                {column.displayName}

                <div>
                    {column.isHideable === true && <HideColumnButton onClick={() => onHideColumn(column.key)} />}
                    {column.isSortable === true && <SortByButton sortDirection={sortDirection} onClick={() => onSortBy(column.key)} />}
                </div>
            </div>
        </TableCell>
    );
}

export default AutoTableHeadCell;

import { SortDirection, TableHead, TableRow } from "@mui/material";
import { AutoTableColumn } from "../AutoTableTypes";
import AutoTableHeadCell from "../AutoTableHeadCell/AutoTableHeadCell";
import { Nullable } from "../../../types/types";

type AutoTableHeadProps = {
    columns: AutoTableColumn[],
    onHideColumn: (columnKey: string) => void,
    onSortBy: (columnKey: string) => void,
    sortBy: Nullable<string>;
    sortDirection: SortDirection,
}

const AutoTableHead = ({columns, onHideColumn, onSortBy, sortDirection, sortBy}: AutoTableHeadProps): JSX.Element => {

    return (
        <TableHead>
            <TableRow>
                {columns
                    .filter(column => column.isVisible !== false)
                    .map(column =>
                        <AutoTableHeadCell
                            key={column.key}
                            column={column}
                            onHideColumn={onHideColumn}
                            onSortBy={onSortBy}
                            sortDirection={sortBy === column.key ? sortDirection : false}
                        />
                    )
                }
            </TableRow>
        </TableHead>
    );
}

export default AutoTableHead;

import { IconButton, SortDirection } from "@mui/material";
import {
    ArrowDownwardRounded,
    ArrowUpwardRounded,
    SortRounded
} from "@mui/icons-material";
import { MouseEventHandler } from "react";

type SortByButtonProps = {
    sortDirection: SortDirection,
    onClick: MouseEventHandler<HTMLButtonElement>,
}

const SortByButton = ({sortDirection, onClick}: SortByButtonProps): JSX.Element => {

    return (
        <IconButton size="small" onClick={onClick}>
            {sortDirection === 'asc' && <ArrowUpwardRounded color="primary" fontSize="inherit" />}
            {sortDirection === 'desc' && <ArrowDownwardRounded color="primary" fontSize="inherit" />}
            {sortDirection === false && <SortRounded fontSize="inherit" color="disabled"/>}
        </IconButton>
    );
}

export default SortByButton;

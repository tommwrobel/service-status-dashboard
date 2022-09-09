import { IconButton } from "@mui/material";
import { VisibilityOffOutlined } from "@mui/icons-material";
import { MouseEventHandler } from "react";

type HideColumnButtonProps = {
    onClick: MouseEventHandler<HTMLButtonElement>,
}

const HideColumnButton = ({onClick}: HideColumnButtonProps): JSX.Element => {

    return (
        <IconButton size="small" onClick={onClick}>
            <VisibilityOffOutlined fontSize="inherit" color="disabled"/>
        </IconButton>
    );
}

export default HideColumnButton;

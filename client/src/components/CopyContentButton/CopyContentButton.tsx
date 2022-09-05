import { IconButton, Snackbar, Tooltip } from "@mui/material";
import { ContentCopyRounded } from "@mui/icons-material";
import { useState } from "react";

type CopyContentButtonProps = {
    content: any;
};

const CopyContentButton = ({
    content,
}: CopyContentButtonProps): JSX.Element => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const handleCopyToClipboard = (value: string): void => {
        navigator.clipboard
            .writeText(value)
            .then(() => setIsSnackbarOpen(true));
    };

    const handleOnSnackbarClose = (): void => {
        setIsSnackbarOpen(false);
    };

    return (
        <>
            <Tooltip title="Copy link">
                <IconButton
                    onClick={() => handleCopyToClipboard(content)}
                    size="small"
                >
                    <ContentCopyRounded fontSize="inherit" />
                </IconButton>
            </Tooltip>

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                onClose={handleOnSnackbarClose}
                message="The link has been copied to the clipboard!"
            />
        </>
    );
};

export default CopyContentButton;

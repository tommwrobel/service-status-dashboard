import { Button, ButtonGroup, Snackbar } from "@mui/material";
import { ContentCopyRounded, OpenInNew } from "@mui/icons-material";
import { useState } from "react";
import classes from "./CopyableLinkButton.module.css";

type CopyableLinkProps = {
    href: string;
    label: string;
};

const CopyableLinkButton = ({ href, label }: CopyableLinkProps): JSX.Element => {

    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    const handleCopyHrefToClipboard = (): void => {
        navigator.clipboard
            .writeText(href)
            .then(() => setIsSnackbarOpen(true));
    };

    const handleOnSnackbarClose = (): void => {
        setIsSnackbarOpen(false);
    };
    return (
        <>
            <ButtonGroup variant="outlined">
                <Button
                    size="small"
                    onClick={handleCopyHrefToClipboard}
                >
                    <ContentCopyRounded fontSize="inherit" />
                </Button>
                <Button
                    size="small"
                    onClick={() => window.open(href, "_blank")}
                >
                    {label}
                    <OpenInNew fontSize="inherit" className={classes.linkIcon} />
                </Button>
            </ButtonGroup>

            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                onClose={handleOnSnackbarClose}
                message="Text has been copied to the clipboard!"
            />
        </>
    );
};

export default CopyableLinkButton;

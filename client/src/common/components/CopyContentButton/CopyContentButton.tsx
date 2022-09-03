import { IconButton, Toolbar, Typography } from "@mui/material";
import { ContentCopyRounded, RefreshRounded } from "@mui/icons-material";

type CopyContentButtonProps = {
    content: any;
}

const CopyContentButton = ({ content }: CopyContentButtonProps) => {

    const handleCopyToClipboard = (value: string): void => {
        navigator
            .clipboard
            .writeText(value)
            .then(() => console.log("Link copied!"));
    };

    return (
        <IconButton onClick={() => handleCopyToClipboard(content)} size="small">
            <ContentCopyRounded fontSize="inherit" />
        </IconButton>
    );
}

export default CopyContentButton;

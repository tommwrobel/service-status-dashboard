import { OpenInNew } from "@mui/icons-material";
import { Button } from "@mui/material";

type OutsideLinkButtonProps = {
    url: string,
    label?: string
}

const OutsideLinkButton = ({url, label}: OutsideLinkButtonProps): JSX.Element => {

    return (
        <Button
            variant="text"
            endIcon={<OpenInNew />}
            href={url}
            target="_blank"
        >
            {label ? label : url}
        </Button>
    );
}

export default OutsideLinkButton;

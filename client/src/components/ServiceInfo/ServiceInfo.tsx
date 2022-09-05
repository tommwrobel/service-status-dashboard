import { IconButton, Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import BuildInfoPopover from "./BuildInfoPopover/BuildInfoPopover";
import { BuildInfo, GitInfo } from "../../types/types";

type ServiceInfoProps = {
    gitInfo: GitInfo | null;
    buildInfo: BuildInfo | null;
    isLoading: boolean;
}

// TODO: refactor this component
const ServiceInfo = ({ gitInfo, buildInfo, isLoading }: ServiceInfoProps): JSX.Element => {

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    if (isLoading) return <Typography style={{fontSize: '0.875rem',fontStyle: "italic", color: "#bdbdbd"}}>Pending info...</Typography>
    if (!gitInfo) return <Typography style={{fontSize: '0.875rem', fontStyle: "italic", color: "#bdbdbd"}}>(No data)</Typography>

    return (
        <>
            {buildInfo &&
                <>
                    <BuildInfoPopover
                        anchorEl={anchorEl}
                        buildInfo={buildInfo}
                        onClose={handlePopoverClose}
                    />
                    <IconButton
                        size="small"
                        onClick={handlePopoverOpen}
                    >
                        <InfoOutlined fontSize="inherit" />
                    </IconButton>
                </>
            }
            {`${gitInfo.branch} / ${gitInfo.commit}`}
        </>
    );
}

export default ServiceInfo;

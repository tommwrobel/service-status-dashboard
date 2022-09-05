import { IconButton, Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import ServiceInfoPopover from "./ServiceInfoPopover/ServiceInfoPopover";
import { BuildInfo, GitInfo, Nullable } from "../../types/types";

type ServiceInfoProps = {
    gitInfo: Nullable<GitInfo>;
    buildInfo: Nullable<BuildInfo>;
    isLoading: boolean;
};

// TODO: refactor this component
const ServiceInfo = ({
    gitInfo,
    buildInfo,
    isLoading,
}: ServiceInfoProps): JSX.Element => {
    const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    if (isLoading)
        return (
            <Typography
                style={{
                    fontSize: "0.875rem",
                    fontStyle: "italic",
                    color: "#bdbdbd",
                }}
            >
                Pending info...
            </Typography>
        );
    if (!gitInfo)
        return (
            <Typography
                style={{
                    fontSize: "0.875rem",
                    fontStyle: "italic",
                    color: "#bdbdbd",
                }}
            >
                (No data)
            </Typography>
        );

    return (
        <>
            {buildInfo && (
                <>
                    <ServiceInfoPopover
                        anchorEl={anchorEl}
                        gitInfo={gitInfo}
                        buildInfo={buildInfo}
                        onClose={handlePopoverClose}
                    />
                    <IconButton size="small" onClick={handlePopoverOpen}>
                        <InfoOutlined fontSize="inherit" />
                    </IconButton>
                </>
            )}
            {`${gitInfo.branch} / ${gitInfo.commit.id}`}
        </>
    );
};

export default ServiceInfo;

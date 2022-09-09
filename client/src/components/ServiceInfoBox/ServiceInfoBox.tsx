import { BranchType, Nullable, DataStatus, ServiceInfo } from "../../types/types";
import { Skeleton } from "@mui/lab";
import { Box, IconButton, Typography } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import ServiceInfoPopover from "./ServiceInfoPopover/ServiceInfoPopover";
import "./ServiceInfoBox.css";

type ServiceInfoBoxProps = {
    data?: ServiceInfo;
    dataStatus?: DataStatus;
};

const ServiceInfoBox = ({
    data,
    dataStatus,
}: ServiceInfoBoxProps): JSX.Element => {

    const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);

    if (dataStatus === 'loading') return <Skeleton variant="text" width={120} />;
    if (dataStatus === 'error') return <>(Error)</>
    if (!data || dataStatus === undefined) return <>(No data)</>

    const getBranchType = (branchName: string): BranchType => {
        if (branchName.startsWith('release')) return "release";
        if (branchName.startsWith('master') || branchName.startsWith('main')) return "release";
        if (branchName.startsWith('develop') || branchName.startsWith('dev')) return "develop";
        if (branchName.includes('feature')) return "feature";
        if (branchName.includes('bugfix')) return "bugfix";
        return "other";
    }

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box className={"InfoChip " + getBranchType(data.git.branch)}>
                <IconButton
                    size="small"
                    onClick={handlePopoverOpen}
                >
                    <InfoOutlined fontSize="inherit" />
                </IconButton>
                <Typography
                    color="inherit"
                    variant="body2"
                    component="span"
                >
                    {data.git.branch}&nbsp;/&nbsp;{data.git.commit.id}
                </Typography>
            </Box>

            <ServiceInfoPopover
                anchorEl={anchorEl}
                data={data}
                onClose={handlePopoverClose}
            />
        </>
    );
};

export default ServiceInfoBox;

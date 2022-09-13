import { Nullable, DataStatus, ServiceInfo } from "../../types/types";
import { Skeleton } from "@mui/lab";
import { Box, IconButton, Typography } from "@mui/material";
import { CommitRounded, InfoOutlined } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import ServiceInfoPopover from "./ServiceInfoPopover/ServiceInfoPopover";
import classes from "./ServiceInfoBox.module.css";

type ServiceInfoBoxProps = {
    data?: ServiceInfo;
    dataStatus?: DataStatus;
    devBranchName: string;
};

const ServiceInfoBox = ({
    data,
    dataStatus,
    devBranchName,
}: ServiceInfoBoxProps): JSX.Element => {

    const [anchorEl, setAnchorEl] = useState<Nullable<HTMLElement>>(null);

    if (dataStatus === 'loading') return <Skeleton variant="text" width={120} />;
    if (dataStatus === 'error') return <>(Error)</>
    if (!data || dataStatus === undefined) return <>(No data)</>

    const getBranchTypeClassName = (branchName: string): string => {
        if (branchName === devBranchName || branchName.startsWith('dev')) return classes.develop;
        if (branchName.startsWith('release') || branchName.startsWith('master') || branchName.startsWith('main')) return classes.release;
        if (branchName.includes('feature')) return classes.feature;
        if (branchName.includes('bugfix')) return classes.bugfix;
        return classes.feature;
    }

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box className={`${classes.infoChip} ${getBranchTypeClassName(data.git.branch)}`}>
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
                    {data.git.branch}
                </Typography>
                <CommitRounded className={classes.commitIcon}/>
                <Typography
                    color="inherit"
                    variant="body2"
                    component="span"
                >
                    {data.git.commit.id}
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

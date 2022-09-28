import { Nullable, DataStatus, ServiceInfo, BranchType } from "../../types/types";
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

    const getBranchType = (branchName: string): BranchType => {
        if (branchName === devBranchName || branchName.startsWith('dev')) return "develop";
        if (branchName.startsWith('release') || branchName.startsWith('master') || branchName.startsWith('main')) return "release";
        if (branchName.includes('feature')) return "feature";
        if (branchName.includes('bugfix')) return "bugfix";
        return "other";
    }

    const getBranchTypeClass = (branchType: BranchType): string => {
        if (branchType === 'develop') return classes.develop;
        if (branchType === 'release') return classes.release;
        if (branchType === 'feature') return classes.feature;
        if (branchType === 'bugfix') return classes.bugfix;
        return classes.other;
    }

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget.parentElement);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box className={`${classes.infoChip} ${getBranchTypeClass(getBranchType(data?.git?.branch || ''))}`}>
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
                    noWrap
                >
                    {data?.git?.branch}
                </Typography>
                {getBranchType(data?.git?.branch || '') !== 'release' &&
                    <>
                        <CommitRounded fontSize="small" className={classes.commitIcon} />
                        <Typography
                        color="inherit"
                        variant="body2"
                        component="span"
                        noWrap
                        >
                            {data?.git?.commit?.id}
                        </Typography>
                    </>
                }
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

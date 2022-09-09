import { BranchType, Nullable, DataStatus, ServiceInfo } from "../../types/types";
import { Skeleton } from "@mui/lab";
import { Chip } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";
import { useState, MouseEvent } from "react";
import ServiceInfoPopover from "./ServiceInfoPopover/ServiceInfoPopover";

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
        if (branchName.startsWith('master') || branchName.startsWith('main')) return "master";
        if (branchName.startsWith('develop') || branchName.startsWith('dev')) return "develop";
        if (branchName.includes('feature')) return "feature";
        if (branchName.includes('bugfix')) return "bugfix";
        return "other";
    }

    const getBranchColor = (branchName: string): "default" | "success" | "primary" | "warning" | "error" | "secondary" | "info" | undefined => {
        const branchType = getBranchType(branchName);
        if (branchType === "release") return "success";
        if (branchType === "develop" || branchType === "master") return "primary";
        if (branchType === "feature") return "warning";
        if (branchType === "bugfix") return "error";
        return "secondary";
    }

    const handlePopoverOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Chip
                label={data.git.branch + ' / ' + data.git.commit.id}
                icon={<InfoOutlined />}
                color={getBranchColor(data.git.branch)}
                variant="outlined"
                onClick={handlePopoverOpen}
            />

            <ServiceInfoPopover
                anchorEl={anchorEl}
                data={data}
                onClose={handlePopoverClose}
            />
        </>
    );
};

export default ServiceInfoBox;

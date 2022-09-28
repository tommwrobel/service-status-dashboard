import { Popover, Typography } from "@mui/material";
import { GitInfo, Nullable, ServiceInfo } from "../../../types/types";
import "./ServiceInfoPopover.css";
import ObjectInfoBox from "../ObjectInfoBox/ObjectInfoBox";

type ServiceInfoPopoverProps = {
    anchorEl: Nullable<HTMLElement>;
    data: ServiceInfo;
    onClose: () => void;
};

const ServiceInfoPopover = ({
    anchorEl,
    data,
    onClose,
}: ServiceInfoPopoverProps): JSX.Element => {
    const open = Boolean(anchorEl);

    const parseGitInfo = (gitInfo: GitInfo): Record<string, string | number> => ({
            "branch": gitInfo?.branch,
            "commit id": gitInfo?.commit.id,
            "commit date": gitInfo?.commit.time,
    });

    return (
        <>
            <Popover
                anchorEl={anchorEl}
                open={open}
                onClose={onClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                disableEnforceFocus
            >
                <Typography className="infoBox" component="div">
                    <ObjectInfoBox data={parseGitInfo(data.git)} />
                    <ObjectInfoBox data={{...data.build}} />
                </Typography>
            </Popover>
        </>
    );
};

export default ServiceInfoPopover;

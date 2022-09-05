import { Popover, Typography } from "@mui/material";
import { BuildInfo, GitInfo, Nullable } from "../../../types/types";
import "./ServiceInfoPopover.css";
import ObjectInfoBox from "../ObjectInfoBox/ObjectInfoBox";

type ServiceInfoPopoverProps = {
    anchorEl: Nullable<HTMLElement>,
    gitInfo: GitInfo,
    buildInfo: BuildInfo,
    onClose: () => void,
}

const ServiceInfoPopover = ({ anchorEl, gitInfo, buildInfo, onClose }: ServiceInfoPopoverProps): JSX.Element => {

    const open = Boolean(anchorEl);

    const parseGitInfo = (gitInfo: GitInfo): Record<string, string | number> => {
        return {"branch": gitInfo.branch, "commit id": gitInfo.commit.id, "commit time": gitInfo.commit.time}
    }

    return (
            <>
                <Popover
                    anchorEl={anchorEl}
                    open={open}
                    onClose={onClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    disableRestoreFocus
                >
                    <Typography className="InfoBox" component="div">
                        <ObjectInfoBox data={parseGitInfo(gitInfo)} />
                        <ObjectInfoBox data={buildInfo} />
                    </Typography>
                </Popover>
            </>
        );
}

export default ServiceInfoPopover;

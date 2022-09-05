import { Popover, Typography } from "@mui/material";
import { BuildInfo } from "../../../types/types";
import "./BuildInfoPopover.css";

type BuildInfoPopoverProps = {
    anchorEl: HTMLElement | null;
    buildInfo: BuildInfo;
    onClose: () => void;
}

const BuildInfoPopover = ({ anchorEl, buildInfo, onClose }: BuildInfoPopoverProps): JSX.Element => {

    const open = Boolean(anchorEl);

    return (
            <>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    onClose={onClose}
                    disableRestoreFocus
                >
                    <Typography className="InfoBox">
                        <pre className="InfoBoxContent">
                            {JSON.stringify(buildInfo, null, 4)}
                        </pre>
                    </Typography>
                </Popover>
            </>
        );
}

export default BuildInfoPopover;

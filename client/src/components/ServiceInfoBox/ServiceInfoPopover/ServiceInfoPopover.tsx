import { Popover, Typography } from "@mui/material";
import { Nullable, ServiceInfo } from "../../../types/types";
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
                disableRestoreFocus
            >
                <Typography className="InfoBox" component="div">
                    <ObjectInfoBox data={{...data.build}} />
                </Typography>
            </Popover>
        </>
    );
};

export default ServiceInfoPopover;

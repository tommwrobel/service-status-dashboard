import { Circle, ErrorRounded } from "@mui/icons-material";
import { DataStatus, ServiceStatus } from "../../types/types";
import { Skeleton } from "@mui/lab";
import { Box } from "@mui/material";
import classes from "./StatusIndicator.module.css";

type ServiceStatusIndicatorProps = {
    status?: ServiceStatus,
    dataStatus?: DataStatus,
};

const StatusIndicator = ({
    status,
    dataStatus,
}: ServiceStatusIndicatorProps): JSX.Element => {

    const getIndicator = (): JSX.Element => {
        if (dataStatus === 'loading') return <Skeleton variant="circular" width={24} height={24} sx={{ fontSize: '1rem' }} />;
        if (dataStatus === 'error') return <ErrorRounded color="disabled" />

        if (status === "UP") return <Circle color="success" />;
        if (status === "DOWN") return <Circle color="error" />;
        return <Circle color="disabled" />;
    }

    return (
        <Box className={classes.indicatorContainer}>
            {getIndicator()}
        </Box>
    );
};

export default StatusIndicator;

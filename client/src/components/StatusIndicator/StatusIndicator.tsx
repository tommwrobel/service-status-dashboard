import { Circle } from "@mui/icons-material";
import { DataStatus, ServiceStatus } from "../../types/types";
import { Skeleton } from "@mui/lab";

type ServiceStatusIndicatorProps = {
    status?: ServiceStatus,
    dataStatus?: DataStatus,
};

const StatusIndicator = ({
    status,
    dataStatus,
}: ServiceStatusIndicatorProps): JSX.Element => {

    if (dataStatus === 'loading') return <Skeleton variant="circular" width={24} height={24} sx={{ fontSize: '1rem' }} />;
    if (dataStatus === 'error') return <>Error!</>

    if (status === "UP") return <Circle color="success" />;
    if (status === "DOWN") return <Circle color="error" />;
    return <Circle color="disabled" />;
};

export default StatusIndicator;

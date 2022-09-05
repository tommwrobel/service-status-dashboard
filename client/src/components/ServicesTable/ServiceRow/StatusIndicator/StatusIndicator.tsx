import { ChangeCircle, Circle } from "@mui/icons-material";
import { ServiceStatus } from "../../../../types/types";

type ServiceStatusIndicatorProps = {
    isLoading: boolean;
    serviceStatus?: ServiceStatus;
};

const StatusIndicator = ({
    isLoading,
    serviceStatus,
}: ServiceStatusIndicatorProps): JSX.Element => {
    if (isLoading) return <ChangeCircle color="disabled" />;
    if (serviceStatus === "Success") return <Circle color="success" />;
    if (serviceStatus === "Failed") return <Circle color="error" />;
    return <Circle color="disabled" />;
};

export default StatusIndicator;

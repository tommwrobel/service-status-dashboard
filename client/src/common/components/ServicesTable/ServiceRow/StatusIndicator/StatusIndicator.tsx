import { ServiceStatus } from "../../../../../react-app-env";
import { ChangeCircle, Circle } from "@mui/icons-material";

type ServiceStatusIndicatorProps = {
    isLoading: boolean,
    serviceStatus?: ServiceStatus
}

const StatusIndicator = ({ isLoading, serviceStatus }: ServiceStatusIndicatorProps) => {
    if(isLoading) return <ChangeCircle color="disabled"/>;
    if(serviceStatus === ServiceStatus.Success) return <Circle color="success"/>;
    if(serviceStatus === ServiceStatus.Failed) return <Circle color="error"/>;
    return <Circle color="disabled"/>;
};

export default StatusIndicator;

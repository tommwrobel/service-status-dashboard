import { ServiceStatus } from "../../../../../react-app-env";
import { ChangeCircle, Circle } from "@mui/icons-material";

type ServiceStatusIndicatorProps = {
    isLoading: boolean,
    serviceStatus?: ServiceStatus
}

const StatusIndicator = ({ isLoading, serviceStatus }: ServiceStatusIndicatorProps) => {
    if(isLoading) return <Circle color="disabled"/>;
    if(serviceStatus === ServiceStatus.Success) return <Circle color="success"/>;
    if(serviceStatus === ServiceStatus.Failed) return <Circle color="error"/>;
    if(serviceStatus === ServiceStatus.Unknow) return <Circle color="disabled"/>;
    return <Circle color="disabled"/>;
};

export default StatusIndicator;

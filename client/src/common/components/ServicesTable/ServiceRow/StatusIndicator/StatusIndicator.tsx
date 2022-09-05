import { ChangeCircle, Circle } from "@mui/icons-material";
import { ServiceStatus } from "../../../../enums/enums";

type ServiceStatusIndicatorProps = {
    isLoading: boolean,
    serviceStatus?: ServiceStatus
}

const StatusIndicator = ({ isLoading, serviceStatus }: ServiceStatusIndicatorProps): JSX.Element => {
    if(isLoading) return <ChangeCircle color="disabled"/>;
    if(serviceStatus === ServiceStatus.Success) return <Circle color="success"/>;
    if(serviceStatus === ServiceStatus.Failed) return <Circle color="error"/>;
    return <Circle color="disabled"/>;
};

export default StatusIndicator;

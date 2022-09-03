import { ServiceStatus } from "../../../../../react-app-env";

type ServiceStatusIndicatorProps = {
    isLoading: boolean,
    serviceStatus?: ServiceStatus
}

const StatusIndicator = ({ isLoading, serviceStatus }: ServiceStatusIndicatorProps) => {

    return(
        <>
            <span>{isLoading ? 'Loading...' : serviceStatus}</span>
        </>
    );

};

export default StatusIndicator;

import { useQuery } from "react-query";
import { useState } from "react";
import { getServiceHealthStatus, getServiceInfo } from "../../server/RestClient";
import { ServiceStatus, ServiceType } from "../../../react-app-env";

export const useServiceData = (service: ServiceType) => {

    const [serviceStatus, setServiceStatus] = useState(ServiceStatus.Unknow);
    const [serviceCommit, setServiceCommit] = useState('');

    const serviceStatusQuery = useQuery(
        ['serviceStatusQuery', service.appUrl],
        () => getServiceHealthStatus(service.appHealthUrl),
        {
            onSuccess: (data) => {
                setServiceStatus(data.success ? ServiceStatus.Success : ServiceStatus.Failed);
            },
            onError: () => setServiceStatus(ServiceStatus.Unknow),
        }
    );
    const serviceRepoQuery = useQuery(
        ['serviceRepoQuery', service.appUrl],
        () => getServiceInfo(service.appUrl),
        {
            onSuccess: (data) => {
                setServiceCommit(data.body?.git?.commit.id);
            },
            onError: () => setServiceCommit(''),
        }
    );

    const refreshServiceStatus = (): void => {
        serviceStatusQuery.refetch();
        serviceRepoQuery.refetch();
    }

    return {
        serviceStatus,
        serviceCommit,
        isError: serviceStatusQuery.isError,
        isLoading: serviceStatusQuery.isLoading,
        isFetching: serviceStatusQuery.isFetching,
        refreshServiceStatus
    };
}

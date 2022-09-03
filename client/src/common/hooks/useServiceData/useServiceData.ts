import { useQuery } from "react-query";
import { useState } from "react";
import { getServiceHealthStatus, getServiceInfo } from "../../server/RestClient";
import { ServiceStatus, ServiceType } from "../../../react-app-env";

export const useServiceData = (service: ServiceType) => {

    const [serviceStatus, setServiceStatus] = useState(ServiceStatus.Unknow);
    const [serviceCommit, setServiceCommit] = useState<string | null>(null);
    const [serviceBranch, setServiceBranch] = useState<string | null>(null);

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
        () => getServiceInfo(service.appInfohUrl),
        {
            onSuccess: (data) => {
                setServiceCommit(data.body?.git?.commit.id);
                setServiceBranch(data.body?.git?.branch);
            }
        }
    );

    const refreshServiceStatus = (): void => {
        serviceStatusQuery.refetch();
        serviceRepoQuery.refetch();
    }

    return {
        serviceStatus,
        serviceCommit,
        serviceBranch,
        isError: serviceStatusQuery.isError,
        isLoading: serviceStatusQuery.isLoading,
        isFetching: serviceStatusQuery.isFetching,
        refreshServiceStatus
    };
}

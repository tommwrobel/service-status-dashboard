import { useQuery } from "react-query";
import { useState } from "react";
import { getServiceHealthStatus, getServiceInfo } from "../../server/RestClient";
import { Service } from "../../types/types";
import { ServiceStatus } from "../../enums/enums";

export const useServiceData = (service: Service) => {

    const [serviceStatus, setServiceStatus] = useState(ServiceStatus.Unknown);
    const [serviceCommit, setServiceCommit] = useState<string | null>(null);
    const [serviceBranch, setServiceBranch] = useState<string | null>(null);

    const serviceStatusQuery = useQuery(
        ['service', 'serviceStatusQuery', service.appUrl],
        () => getServiceHealthStatus(service.appHealthUrl),
        {
            onSuccess: (data) => {
                setServiceStatus(data.success ? ServiceStatus.Success : ServiceStatus.Failed);
            },
            onError: () => setServiceStatus(ServiceStatus.Unknown),
        }
    );
    const serviceRepoQuery = useQuery(
        ['service', 'serviceRepoQuery', service.appUrl],
        () => getServiceInfo(service.appInfoUrl),
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
        isError: serviceStatusQuery.isError || serviceRepoQuery.isError,
        isLoading: serviceStatusQuery.isLoading || serviceRepoQuery.isLoading,
        isFetching: serviceStatusQuery.isFetching || serviceRepoQuery.isFetching,
        refreshServiceStatus
    };
}

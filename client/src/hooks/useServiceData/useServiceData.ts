import { useQuery } from "react-query";
import { useState } from "react";
import { getServiceHealthStatus, getServiceInfo } from "../../server/RestClient";
import { BuildInfo, GitInfo, Service, ServiceStatus } from "../../types/types";

export const useServiceData = (service: Service) => {

    const [serviceStatus, setServiceStatus] = useState<ServiceStatus>("Unknown");
    const [gitInfo, setGitInfo] = useState<GitInfo | null>(null);
    const [buildInfo, setBuildInfo] = useState<BuildInfo | null>(null);

    const serviceStatusQuery = useQuery(
        ['service', 'serviceStatusQuery', service.appUrl],
        () => getServiceHealthStatus(service.appHealthUrl),
        {
            onSuccess: (data) => {
                setServiceStatus(data.success ? "Success" : "Failed");
            },
            onError: () => setServiceStatus("Unknown"),
        }
    );
    const serviceRepoQuery = useQuery(
        ['service', 'serviceRepoQuery', service.appUrl],
        () => getServiceInfo(service.appInfoUrl),
        {
            onSuccess: (data) => {
                setGitInfo(data.body?.git);
                setBuildInfo(data.body?.build);
            }
        }
    );

    const refreshServiceStatus = (): void => {
        serviceStatusQuery.refetch();
        serviceRepoQuery.refetch();
    }

    return {
        serviceStatus,
        gitInfo,
        buildInfo,
        isError: serviceStatusQuery.isError || serviceRepoQuery.isError,
        isLoading: serviceStatusQuery.isLoading || serviceRepoQuery.isLoading,
        isFetching: serviceStatusQuery.isFetching || serviceRepoQuery.isFetching,
        refreshServiceStatus
    };
}

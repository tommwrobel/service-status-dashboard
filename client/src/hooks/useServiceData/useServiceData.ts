import { useQuery } from "react-query";
import { useState } from "react";
import { getServiceHealthStatus, getServiceInfo } from "../../server/RestClient";
import { BuildInfo, GitInfo, Nullable, Service, ServiceStatus } from "../../types/types";

export const useServiceData = (service: Service) => {

    const [serviceStatus, setServiceStatus] = useState<ServiceStatus>("Unknown");
    const [gitInfo, setGitInfo] = useState<Nullable<GitInfo>>(null);
    const [buildInfo, setBuildInfo] = useState<Nullable<BuildInfo>>(null);

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
                setGitInfo(data.body?.git || null);
                setBuildInfo(data.body?.build || null);
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

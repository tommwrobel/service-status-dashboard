import {
    DataStatus,
    Environment,
    HealthCheck, Maybe,
    ServiceInfo,
    ServiceInfoResponse, ServiceRowData,
    ServiceStatus
} from "../../types/types";
import { useEffect, useState } from "react";
import { getServiceHealthStatus, getServiceInfo } from "../../server/RestClient";
import { QueryClient, QueryKey, useQueries } from "@tanstack/react-query";

const useEnvironmentData = (env: Environment, queryClient: QueryClient) => {

    const [services, setServices] = useState<ServiceRowData[]>(env.services);

    useEffect(() => {
        setServices(env.services);
    }, [env]);

    const handleChangeServiceStatus = (serviceAppUrl: string, newStatus: ServiceStatus): void => {
        let serviceIndex = services.findIndex(service => service?.appUrl === serviceAppUrl);
        if (serviceIndex < 0) return;

        if (services[serviceIndex].status !== newStatus) {
            setServices(services => {
                services[serviceIndex].status = newStatus;
                return services;
            })
        }
    };

    const handleChangeServiceInfo = (serviceAppUrl: string, newInfo: Maybe<ServiceInfo>): void => {
        let serviceIndex = services.findIndex(service => service?.appUrl === serviceAppUrl);
        if (serviceIndex < 0 || !newInfo) return;

        setServices(services => {
            services[serviceIndex].buildInfo = newInfo;
            return services;
        })
    };

    const handleChangeServiceDataStatus = (serviceAppUrl: string, newStatus: DataStatus): void => {
        let serviceIndex = services.findIndex(service => service.appUrl === serviceAppUrl);
        if (serviceIndex < 0 || services[serviceIndex].dataStatus === undefined || services[serviceIndex].dataStatus === newStatus) return;

        setServices(services => {
            services[serviceIndex].dataStatus = newStatus;
            return services;
        })
    }

    const handleRefreshServiceData = (appUrl: string, appHealthUrl: string, appInfoUrl: string): void => {
        queryClient.refetchQueries(['serviceHealthCheck', appHealthUrl, env.name]);
        queryClient.refetchQueries(['servicesInfo', appInfoUrl, env.name]);

        handleChangeServiceDataStatus(appUrl, getDataStatusFromQueryClient(['serviceHealthCheck', appUrl, env.name]));
    }

    const getDataStatusFromQueryClient = (queryKey: QueryKey): DataStatus => {
        return queryClient.getQueryState(queryKey)?.status;
    }

    useEffect(() => {
        services?.map(service => {
            const serviceDataStatus = getDataStatusFromQueryClient(['serviceHealthCheck', service.appHealthUrl, env.name]);
            handleChangeServiceDataStatus(service.appUrl, serviceDataStatus);
        });
    });

    const servicesHealthCheckQueries  = useQueries({
        queries: env.services.map(service => ({
                queryKey: ['serviceHealthCheck', service.appHealthUrl, env.name],
                queryFn: () => getServiceHealthStatus(service.appHealthUrl),
                onSuccess: (data: HealthCheck) => {
                    handleChangeServiceStatus(service.appUrl, data.success ? 'UP' : 'DOWN');
                },
            })
        )
    });

    const servicesInfoQueries  = useQueries({
        queries: env.services.map(service => ({
                queryKey: ['servicesInfo', service.appInfoUrl, env.name],
                queryFn: () => getServiceInfo(service.appInfoUrl),
                onSuccess: (data: ServiceInfoResponse) => {
                    handleChangeServiceInfo(service.appUrl, data.body);
                },
            })
        )
    });

    return {services, handleRefreshServiceData};
}

export default useEnvironmentData;

import {
    DataStatus, Maybe, Service, ServiceRow, ServiceStatus
} from "../../types/types";
import { useEffect, useState } from "react";
import { getServiceHealthStatus, getServiceInfo } from "../../server/RestClient";
import { QueryClient, QueryKey, useQueries } from "@tanstack/react-query";
import { getQueryDataStatus, parseHealthCheckStatus } from "./useServicesDataSupport";

const useServicesData = (initialServices: Service[], queryClient: QueryClient) => {

    const [services, setServices] = useState<ServiceRow[]>(initialServices);

    useEffect(() => {
        setServices(initialServices);
    }, [initialServices]);

    const servicesHealthCheckQueries  = useQueries({
        queries: services.map(service => ({
                queryKey: ['serviceHealth', service.appHealthUrl],
                queryFn: () => getServiceHealthStatus(service.appHealthUrl),
            })
        )
    });

    const servicesInfoQueries  = useQueries({
        queries: services.map(service => ({
                queryKey: ['serviceInfo', service.appInfoUrl],
                queryFn: () => getServiceInfo(service.appInfoUrl)
            })
        )
    });

    useEffect(() => {
        const handleRefetchServiceData = (index: number): void => {
            servicesInfoQueries[index]?.refetch();
            servicesHealthCheckQueries[index]?.refetch();

            setServices(services => {
                services[index].statusDataStatus
                    = getQueryDataStatus(['serviceHealth', services[index].appHealthUrl], queryClient);
                services[index].buildInfoDataStatus
                    = getQueryDataStatus(['serviceInfo', services[index].appInfoUrl], queryClient);
                return services;
            })
        }

        let updatedServices: ServiceRow[];
        updatedServices = services.map((service, index) => {
            return {
                ...service,
                status: parseHealthCheckStatus(servicesHealthCheckQueries[index]?.data?.success),
                buildInfo: servicesInfoQueries[index]?.data?.body,
                statusDataStatus: getQueryDataStatus(['serviceHealth', services[index].appHealthUrl], queryClient),
                buildInfoDataStatus: getQueryDataStatus(['serviceInfo', services[index].appInfoUrl], queryClient),
                refreshServiceData: () => handleRefetchServiceData(index),
            };
        });

        if (updatedServices.find((updatedService, index) =>
                updatedService.statusDataStatus !== services[index].statusDataStatus) ||
            updatedServices.find((updatedService, index) =>
                updatedService.buildInfoDataStatus !== services[index].buildInfoDataStatus)) {
            setServices(updatedServices);
        }
    }, [servicesInfoQueries, servicesHealthCheckQueries, services, queryClient]);

    return {services};
}

export default useServicesData;

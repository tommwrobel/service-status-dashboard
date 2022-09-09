import {
    DataStatus, Environment, ServiceRow
} from "../../types/types";
import { useEffect, useState } from "react";
import { getServiceHealthStatus, getServiceInfo } from "../../server/RestClient";
import { QueryClient, QueryKey, useQueries } from "@tanstack/react-query";
import { QueryState } from "@tanstack/react-query/build/types/packages/query-core/src/query";

const useServicesData = (env: Environment, queryClient: QueryClient) => {

    const [services, setServices] = useState<ServiceRow[]>(env.services);

    const handleChangeEnvironment = (env: Environment) => {
        setServices(env.services);
    }

    const servicesHealthCheckQueries  = useQueries({
        queries: env.services.map(service => ({
                queryKey: [service.appHealthUrl, env.name],
                queryFn: () => getServiceHealthStatus(service.appHealthUrl),
            })
        )
    });

    const servicesInfoQueries  = useQueries({
        queries: env.services.map(service => ({
                queryKey: [service.appInfoUrl, env.name],
                queryFn: () => getServiceInfo(service.appInfoUrl)
            })
        )
    });

    const getQueryDataStatus = (queryKey: QueryKey): DataStatus => {
        const queryState = queryClient.getQueryState(queryKey);
        if (queryState === undefined) return undefined;
        if (queryState.fetchStatus === "fetching") return "loading";
        return queryState.status;
    }

    const handleRefetchServiceData = (index: number): void => {
        servicesInfoQueries[index]?.refetch();
        servicesHealthCheckQueries[index]?.refetch();

        setServices(services => {
            services[index].statusDataStatus = getQueryDataStatus([services[index].appHealthUrl, env.name]);
            services[index].buildInfoDataStatus = getQueryDataStatus([services[index].appInfoUrl, env.name]);
            return services;
        })
    }

    useEffect(() => {
        let updatedServices: ServiceRow[];
        updatedServices = services.map((service, index) => {
            return {
                ...service,
                status: servicesHealthCheckQueries[index]?.data?.success === true ? 'UP'
                    : servicesHealthCheckQueries[index]?.data?.success === false ? 'DOWN' : undefined,
                buildInfo: servicesInfoQueries[index]?.data?.body,
                statusDataStatus: getQueryDataStatus([services[index].appHealthUrl, env.name]),
                buildInfoDataStatus: getQueryDataStatus([services[index].appInfoUrl, env.name]),
                refreshServiceData: () => handleRefetchServiceData(index),
            };
        });

        if (updatedServices.find((updatedService, index) => updatedService.statusDataStatus !== services[index].statusDataStatus) ||
            updatedServices.find((updatedService, index) => updatedService.buildInfoDataStatus !== services[index].buildInfoDataStatus)) {
            setServices(updatedServices);
        }
    }, [servicesInfoQueries, servicesHealthCheckQueries, services]);

    return {services, handleChangeEnvironment};
}

export default useServicesData;

import {Environment,ServiceRow
} from "../../types/types";
import { useEffect, useState } from "react";
import { getServiceHealthStatus, getServiceInfo } from "../../server/RestClient";
import { useQueries } from "@tanstack/react-query";

const useServicesData = (env: Environment) => {

    const [services, setServices] = useState<ServiceRow[]>(env.services);

    const handleChangeEnvironment = (env: Environment) => {
        setServices(env.services);
    }

    const servicesHealthCheckQueries  = useQueries({
        queries: env.services.map(service => ({
                queryKey: ['serviceHealthCheck', service.appHealthUrl, env.name],
                queryFn: () => getServiceHealthStatus(service.appHealthUrl),
            })
        )
    });

    const servicesInfoQueries  = useQueries({
        queries: env.services.map(service => ({
                queryKey: ['servicesInfo', service.appInfoUrl, env.name],
                queryFn: () => getServiceInfo(service.appInfoUrl)
            })
        )
    });

    useEffect(() => {
        let updatedServices: ServiceRow[];
        updatedServices = services.map((service, index) => {
            return {
                ...service,
                status: servicesHealthCheckQueries[index]?.data?.success === true ? 'UP'
                    : servicesHealthCheckQueries[index]?.data?.success === false ? 'DOWN' : undefined,
                buildInfo: servicesInfoQueries[index]?.data?.body,
                statusDataStatus: servicesHealthCheckQueries[index]?.status,
                buildInfoDataStatus: servicesInfoQueries[index]?.status,
                refreshServiceData: () => {
                    servicesInfoQueries[index]?.refetch();
                    servicesHealthCheckQueries[index]?.refetch();
                },
            };
        });

        if (updatedServices.find((updatedService, index) => updatedService.statusDataStatus !== services[index].statusDataStatus) ||
            updatedServices.find((updatedService, index) => updatedService.buildInfoDataStatus !== services[index].buildInfoDataStatus)) {
            setServices(updatedServices);
        }
    }, [servicesInfoQueries, servicesHealthCheckQueries]);

    return {services, handleChangeEnvironment};
}

export default useServicesData;
